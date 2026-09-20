import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const output = "artifacts/rebuild-qa";
const extension = resolve(output, "zoom-extension");
mkdirSync(extension, { recursive: true });
// Chromium's real tab zoom changes layout width and DPR, unlike CSS zoom
// or Playwright's deviceScaleFactor alone. The temporary extension is local.
writeFileSync(
  `${extension}/manifest.json`,
  JSON.stringify({
    manifest_version: 3,
    name: "Local layout QA",
    version: "1.0",
    permissions: ["tabs"],
    background: { service_worker: "worker.js" },
  }),
);
writeFileSync(
  `${extension}/worker.js`,
  "chrome.runtime.onInstalled.addListener(() => {});",
);
const context = await chromium.launchPersistentContext("", {
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : { channel: "chromium" }),
  headless: true,
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
  args: [
    `--disable-extensions-except=${extension}`,
    `--load-extension=${extension}`,
  ],
});
const results = [];
try {
  await context.addInitScript(() =>
    localStorage.setItem(
      "cp-cookie-consent",
      JSON.stringify({ version: 1, ts: Date.now() }),
    ),
  );
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  async function screenshot(path, label) {
    if (!label.startsWith("zoom-")) return page.screenshot({ path });
    // Playwright's CSS-coordinate clipping is offset after scrolling at real
    // tab zoom. Capture the actual visible surface without a synthetic clip.
    await page.evaluate(
      () =>
        new Promise((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(resolve)),
        ),
    );
    const shot = await cdp.send("Page.captureScreenshot", {
      format: "png",
      captureBeyondViewport: false,
    });
    writeFileSync(path, Buffer.from(shot.data, "base64"));
  }
  await page.goto(base);
  const worker =
    context.serviceWorkers()[0] ||
    (await context.waitForEvent("serviceworker"));
  const tabId = await worker.evaluate(async (url) => {
    const tabs = await chrome.tabs.query({ url: `${url}/*` });
    return tabs[0].id;
  }, base);
  const routes = ["/", "/services", "/about", "/privacy"];
  const widths = [
    1920, 1600, 1440, 1366, 1280, 1180, 1024, 900, 768, 430, 390, 360,
  ];
  async function inspect(route, label) {
    await page.goto(base + route);
    await page.evaluate(() => document.fonts.ready);
    const metrics = await page.evaluate(() => {
      const rect = (selector) =>
        document.querySelector(selector)?.getBoundingClientRect();
      const h1 = document.querySelector("h1");
      const header = rect(".header-bar");
      const logo = rect(".header-bar .brand");
      const nav = rect(".desktop-nav");
      const actions = rect(".header-actions");
      const footer = rect(".site-footer .site-container");
      const container = h1.closest(".site-container").getBoundingClientRect();
      const mobile =
        getComputedStyle(document.querySelector(".mobile-toggle")).display !==
        "none";
      const range = document.createRange();
      range.selectNodeContents(h1);
      const textRects = [...range.getClientRects()].filter((r) => r.width > 0);
      const clippingAncestors = [];
      for (
        let ancestor = h1.parentElement;
        ancestor;
        ancestor = ancestor.parentElement
      ) {
        const style = getComputedStyle(ancestor);
        if (["hidden", "clip"].includes(style.overflowY))
          clippingAncestors.push(ancestor.getBoundingClientRect());
      }
      return {
        width: innerWidth,
        dpr: devicePixelRatio,
        overflow: document.documentElement.scrollWidth > innerWidth + 1,
        mobile,
        collision: mobile
          ? false
          : logo.right > nav.left ||
            nav.right > actions.left ||
            actions.right > header.right + 1,
        aligned:
          Math.abs(header.left - container.left) < 1 &&
          Math.abs(header.left - footer.left) < 1,
        // Font glyph boxes can exceed the H1 line box without being clipped.
        // Check the viewport and actual clipping ancestors instead.
        clippedTitle: textRects.some(
          (r) =>
            r.left < -1 ||
            r.right > innerWidth + 1 ||
            clippingAncestors.some(
              (parent) =>
                r.top < parent.top - 1 || r.bottom > parent.bottom + 1,
            ),
        ),
        reducedMotion:
          getComputedStyle(document.documentElement).scrollBehavior === "auto",
      };
    });
    assert(
      !metrics.overflow &&
        !metrics.collision &&
        !metrics.clippedTitle &&
        metrics.aligned &&
        metrics.reducedMotion,
      `${route} ${label}: ${JSON.stringify(metrics)}`,
    );
    await screenshot(
      `${output}/${route.slice(1) || "home"}-${label}-hero.png`,
      label,
    );
    if (route === "/services") {
      for (const id of [
        "smart",
        "power",
        "industrial",
        "specialised",
        "renewable",
      ]) {
        await page.locator(`.local-nav a[href="#${id}"]`).click();
        await page.waitForFunction(
          (id) =>
            document
              .querySelector(`.local-nav a[href="#${id}"]`)
              .getAttribute("aria-current") === "location",
          id,
        );
        const anchor = await page.evaluate((id) => {
          const header = document
            .querySelector(".site-header")
            .getBoundingClientRect();
          const nav = document
            .querySelector(".local-nav")
            .getBoundingClientRect();
          const section = document.getElementById(id).getBoundingClientRect();
          return {
            headerTop: header.top,
            gap: nav.top - header.bottom,
            clearance: section.top - nav.bottom,
          };
        }, id);
        assert(
          Math.abs(anchor.headerTop) <= 1 &&
            Math.abs(anchor.gap) <= 1 &&
            anchor.clearance >= 15 &&
            anchor.clearance <= 35,
          `${label} anchor ${id}: ${JSON.stringify(anchor)}`,
        );
      }
      await screenshot(`${output}/services-${label}-sticky.png`, label);
    }
    await page.locator(".site-footer").scrollIntoViewIfNeeded();
    await page.waitForFunction(
      () =>
        !document
          .querySelector(".site-header")
          .classList.contains("header-overlay"),
    );
    await screenshot(
      `${output}/${route.slice(1) || "home"}-${label}-footer.png`,
      label,
    );
    if (route === "/") {
      await page
        .getByRole("button", { name: "Cookie Settings", exact: true })
        .click();
      for (const button of await page.locator("dialog button").all()) {
        await button.scrollIntoViewIfNeeded();
        assert(
          await button.evaluate((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.left >= 0 &&
              rect.right <= innerWidth + 1 &&
              rect.top >= 0 &&
              rect.bottom <= innerHeight + 1
            );
          }),
          `${label}: cookie control must fit and be reachable`,
        );
      }
      await screenshot(`${output}/cookies-${label}.png`, label);
      await page.keyboard.press("Escape");
    }
    results.push({ route, label, ...metrics, passed: true });
  }
  for (const width of widths) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of routes) await inspect(route, String(width));
    console.log(
      `${width}px: header, H1, grid, footer and service anchors passed`,
    );
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  for (const zoom of [1.25, 1.5, 2]) {
    await worker.evaluate(
      ({ tabId, zoom }) => chrome.tabs.setZoom(tabId, zoom),
      { tabId, zoom },
    );
    assert.equal(
      await worker.evaluate((id) => chrome.tabs.getZoom(id), tabId),
      zoom,
    );
    for (const route of routes) await inspect(route, `zoom-${zoom * 100}`);
    console.log(
      `${zoom * 100}% actual browser zoom: layout and anchors passed`,
    );
  }
  writeFileSync(`${output}/layout.json`, JSON.stringify(results, null, 2));
} finally {
  await context.close();
}
