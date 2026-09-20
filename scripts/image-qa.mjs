import assert from "node:assert/strict";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
const output = "artifacts/rebuild-qa";
mkdirSync(output, { recursive: true });
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_PATH
    ? { executablePath: process.env.CHROMIUM_PATH }
    : {}),
  headless: true,
});
const results = [];
try {
  // Separate cold browser contexts exercise lazy loading at both sizes.
  for (const width of [1440, 390]) {
    const context = await browser.newContext({
      viewport: { width, height: 900 },
    });
    await context.addInitScript(() =>
      localStorage.setItem(
        "cp-cookie-consent",
        JSON.stringify({ version: 1, ts: Date.now() }),
      ),
    );
    const page = await context.newPage();
    const runtimeErrors = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    await page.goto(base);
    await page.evaluate(() => document.fonts.ready);
    const images = [];
    for (const img of await page.locator("img").all()) {
      // Pending lazy images are not failures. Trigger loading and await decode;
      // only a failed decode or an explicit timeout counts as a failure.
      await img.scrollIntoViewIfNeeded();
      const state = await img.evaluate(async (element) => {
        let timer;
        let error = null;
        try {
          await Promise.race([
            element.decode(),
            new Promise((_, reject) => {
              timer = setTimeout(
                () => reject(new Error("Image decode timed out after 30s")),
                30000,
              );
            }),
          ]);
        } catch (failure) {
          error = String(failure);
        } finally {
          clearTimeout(timer);
        }
        return {
          src: element.src,
          currentSrc: element.currentSrc,
          alt: element.alt,
          loading: element.loading,
          complete: element.complete,
          naturalWidth: element.naturalWidth,
          naturalHeight: element.naturalHeight,
          error,
        };
      });
      const selected = new URL(state.currentSrc || state.src);
      const original =
        selected.pathname === "/_next/image"
          ? new URL(selected.searchParams.get("url"), base)
          : selected;
      const urls = [
        ...new Set(
          [state.src, state.currentSrc, original.href].filter(Boolean),
        ),
      ];
      const responses = [];
      for (const url of urls) {
        const response = await page.request.get(url);
        const contentType = response.headers()["content-type"] || "";
        responses.push({
          url,
          status: response.status(),
          contentType,
          ok: response.ok() && contentType.startsWith("image/"),
        });
      }
      const localExists =
        original.origin !== new URL(base).origin ||
        existsSync(
          resolve("public", `.${decodeURIComponent(original.pathname)}`),
        );
      images.push({
        ...state,
        original: original.href,
        localExists,
        responses,
        passed:
          !state.error &&
          state.complete &&
          state.naturalWidth > 0 &&
          localExists &&
          responses.every((response) => response.ok),
      });
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await page.screenshot({
      path: `${output}/home-${width}.png`,
      fullPage: true,
    });
    const broken = images.filter((img) => !img.passed);
    results.push({
      width,
      count: images.length,
      broken,
      runtimeErrors,
      images,
    });
    console.log(
      `${width}px: ${images.length} images, ${broken.length} broken, ${runtimeErrors.length} runtime errors`,
    );
    await context.close();
  }
  writeFileSync(`${output}/images.json`, JSON.stringify(results, null, 2));
  assert(
    results.every(
      (result) =>
        result.count > 0 &&
        result.broken.length === 0 &&
        result.runtimeErrors.length === 0,
    ),
    "Homepage image audit failed; see artifacts/rebuild-qa/images.json",
  );
} finally {
  await browser.close();
}
