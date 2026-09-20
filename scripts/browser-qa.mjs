import assert from "node:assert/strict";
import { mkdirSync, writeFileSync } from "node:fs";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const widths = [
  1920, 1600, 1440, 1366, 1280, 1180, 1024, 900, 768, 430, 390, 360,
];
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
  headless: true,
});
const context = await browser.newContext();
await context.addInitScript(() =>
  localStorage.setItem(
    "cp-cookie-consent",
    JSON.stringify({ version: 1, ts: Date.now() }),
  ),
);
const page = await context.newPage();
const results = {
  pages: [],
  overflows: [],
  errors: [],
  brokenLinks: [],
  notFound: [],
};
page.on("pageerror", (error) => results.errors.push(error.message));
const links = new Set();
try {
  const sitemap = await (await page.request.get(`${base}/sitemap.xml`)).text();
  const routes = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
    (match) => new URL(match[1]).pathname,
  );
  assert.equal(routes.length, 20, "The approved sitemap has 20 routes");
  for (const route of routes) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    const response = await page.goto(base + route);
    const headings = await page.locator("h1").count();
    const canonical = await page
      .locator("link[rel=canonical]")
      .getAttribute("href");
    const violations = (
      await new AxeBuilder({ page }).analyze()
    ).violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      targets: v.nodes.map((n) => n.target),
    }));
    results.pages.push({
      route,
      status: response.status(),
      headings,
      canonical,
      violations,
    });
    for (const href of await page
      .locator('a[href^="/"]')
      .evaluateAll((els) => els.map((el) => el.getAttribute("href"))))
      links.add(href);
    for (const width of widths) {
      await page.setViewportSize({ width, height: 900 });
      const dimensions = await page.evaluate(() => ({
        width: document.documentElement.clientWidth,
        scrollWidth: document.documentElement.scrollWidth,
      }));
      if (dimensions.scrollWidth > dimensions.width + 1)
        results.overflows.push({ route, width, ...dimensions });
    }
    console.log(
      `${route}: HTTP ${response.status()}, ${headings} H1, ${violations.length} accessibility violations`,
    );
  }
  for (const href of links) {
    const url = new URL(href, base);
    const response = await page.request.get(url.href);
    if (response.status() >= 400)
      results.brokenLinks.push({ href, status: response.status() });
    if (url.hash) {
      await page.goto(url.origin + url.pathname);
      const found = await page.evaluate(
        (id) => Boolean(document.getElementById(id)),
        decodeURIComponent(url.hash.slice(1)),
      );
      if (!found) results.brokenLinks.push({ href, missingAnchor: true });
    }
  }
  // Unknown slugs must render the real 404, including Object prototype names.
  for (const route of [
    "/qa-missing-page",
    "/favicon.ico",
    "/constructor",
    "/toString",
    "/__proto__",
    "/products/qa-missing-page",
  ]) {
    const response = await page.goto(base + route);
    results.notFound.push({
      route,
      status: response.status(),
      heading: await page.locator("h1").textContent(),
      noindex: await page
        .locator('meta[name="robots"]')
        .evaluateAll((elements) =>
          elements.some((element) => element.content.includes("noindex")),
        ),
    });
  }
  mkdirSync("artifacts/rebuild-qa", { recursive: true });
  writeFileSync(
    "artifacts/rebuild-qa/audit.json",
    JSON.stringify(results, null, 2),
  );
  assert(
    results.pages.every(
      (p) =>
        p.status === 200 &&
        p.headings === 1 &&
        new URL(p.canonical).pathname === p.route &&
        p.violations.length === 0,
    ),
    "Route, metadata or accessibility check failed",
  );
  assert.equal(results.overflows.length, 0, "Page overflow detected");
  assert.equal(results.errors.length, 0, "Browser runtime errors detected");
  assert(
    results.notFound.every(
      (result) =>
        result.status === 404 &&
        result.noindex &&
        result.heading === "Let’s get you connected.",
    ),
    "Missing routes must return the branded 404 with noindex",
  );
  assert.equal(
    results.brokenLinks.length,
    0,
    "Broken internal links or anchors detected",
  );
  console.log(
    `Passed: ${routes.length} routes and ${routes.length * widths.length} viewport checks.`,
  );
} finally {
  await browser.close();
}
