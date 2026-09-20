import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs";
import assert from "node:assert/strict";
const base = process.env.QA_BASE_URL || "http://127.0.0.1:3000";
(async () => {
  const browser = await chromium.launch({
    ...(process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {}),
    headless: true,
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  });
  try {
    fs.mkdirSync("artifacts/rebuild-qa", { recursive: true });
    // Block browser delivery even if runtime credentials differ from the build.
    await context.route("**/api/contact", (route) =>
      route.fulfill({
        status: 503,
        contentType: "application/json",
        body: JSON.stringify({ error: "Local QA: delivery intercepted." }),
      }),
    );
    const page = await context.newPage();
    const checks = [];
    const check = (name, ok, detail) => {
      checks.push({ name, ok, detail });
      console.log(ok ? "PASS" : "FAIL", name, detail || "");
    };
    const axe = async (name) => {
      const violations = (await new AxeBuilder({ page }).analyze()).violations;
      check(
        name,
        violations.length === 0,
        violations.map((v) => ({
          id: v.id,
          targets: v.nodes.map((n) => n.target),
        })),
      );
    };
    await page.goto(base);
    await page
      .getByRole("button", { name: "Manage preferences", exact: true })
      .click();
    await axe("Cookie preferences accessibility");
    await page.screenshot({ path: "artifacts/rebuild-qa/cookie-dialog.png" });
    await page.keyboard.press("Escape");
    check("Cookie Escape closes", (await page.locator("dialog").count()) === 0);
    check(
      "Cookie Escape restores focus",
      await page
        .getByRole("button", { name: "Manage preferences", exact: true })
        .evaluate((el) => el === document.activeElement),
    );
    await page
      .getByRole("button", { name: "Reject optional cookies", exact: true })
      .click();
    check(
      "Consent stored with no optional categories",
      await page.evaluate(() => {
        let s = JSON.parse(localStorage.getItem("cp-cookie-consent"));
        return (
          s.analytics === false &&
          s.functional === false &&
          s.marketing === false
        );
      }),
    );
    await page.reload();
    await page.waitForTimeout(700);
    check(
      "Consent persists",
      (await page.locator(".cookie-banner").count()) === 0,
    );
    await page.getByRole("button", { name: "Solutions", exact: true }).focus();
    await page.keyboard.press("Enter");
    check("Desktop menu opens", await page.locator("#nav-panel-0").isVisible());
    await axe("Desktop menu accessibility");
    await page.keyboard.press("Escape");
    check(
      "Desktop Escape restores trigger",
      await page
        .getByRole("button", { name: "Solutions", exact: true })
        .evaluate((el) => document.activeElement === el),
    );
    await page.goto(base + "/services");
    for (const id of [
      "smart",
      "power",
      "industrial",
      "specialised",
      "renewable",
    ]) {
      await page.locator(`.local-nav a[href="#${id}"]`).click();
      await page.waitForTimeout(150);
      const rect = await page.locator("#" + id).boundingBox();
      const header = await page.locator(".site-header").boundingBox();
      const local = await page.locator(".local-nav").boundingBox();
      check("Service anchor " + id, rect.y >= header.height + local.height, {
        top: rect.y,
        offset: header.height + local.height,
      });
      check(
        "Service active " + id,
        (await page
          .locator(`.local-nav a[href="#${id}"]`)
          .getAttribute("aria-current")) === "location",
      );
    }
    await page.setViewportSize({ width: 390, height: 844 });
    await page
      .getByRole("button", { name: "Open navigation", exact: true })
      .click();
    await axe("Mobile navigation accessibility");
    await page.screenshot({ path: "artifacts/rebuild-qa/mobile-menu.png" });
    await page.keyboard.press("Escape");
    check(
      "Mobile Escape restores focus",
      await page
        .getByRole("button", { name: "Open navigation", exact: true })
        .evaluate((el) => el === document.activeElement),
    );
    await page.keyboard.press("Enter");
    await page.locator("dialog summary").filter({ hasText: "Company" }).click();
    await page
      .locator("dialog")
      .getByRole("link", { name: "About", exact: true })
      .click();
    await page.waitForURL("**/about");
    check(
      "Mobile navigation closes on route",
      (await page.locator("dialog").count()) === 0,
    );
    await page.goto(base + "/team");
    await page.getByRole("button", { name: "Leadership", exact: true }).click();
    check("Team filter", (await page.locator(".team-card").count()) === 2);
    await page.locator(".team-card").first().click();
    await axe("Team profile accessibility");
    for (let step = 0; step < 12; step++) {
      await page.keyboard.press("Tab");
      // Native dialogs permit tabbing to browser chrome (document.hasFocus=false),
      // but must never focus a background page control while the document is active.
      assert(
        await page.evaluate(
          () =>
            Boolean(document.activeElement.closest("dialog")) ||
            (!document.hasFocus() && document.activeElement === document.body),
        ),
        "Modal focus must not reach background page controls",
      );
    }
    check("Modal keyboard focus containment", true);
    await page.keyboard.press("Escape");
    check(
      "Team Escape restores focus",
      await page
        .locator(".team-card")
        .first()
        .evaluate((el) => document.activeElement === el),
    );
    await page.goto(base + "/products/smart-grid-transformer");
    await page
      .getByRole("button", { name: "Open transformer image 1", exact: true })
      .click();
    await page.getByRole("button", { name: "Next image", exact: true }).click();
    check(
      "Gallery next",
      (await page.locator(".gallery-controls [role=status]").textContent()) ===
        "2 / 7",
    );
    await page.keyboard.press("ArrowRight");
    check(
      "Gallery arrow",
      (await page.locator(".gallery-controls [role=status]").textContent()) ===
        "3 / 7",
    );
    await axe("Gallery accessibility");
    await page.keyboard.press("Escape");
    check(
      "Gallery closes and restores focus",
      await page
        .getByRole("button", { name: "Open transformer image 1", exact: true })
        .evaluate((el) => el === document.activeElement),
    );
    await page.goto(base + "/announcements");
    await page.locator(".article-card").first().click();
    check("Article single heading", (await page.locator("h1").count()) === 1);
    await page
      .getByRole("button", { name: "← All announcements", exact: true })
      .click();
    check(
      "Article returns focus",
      await page
        .locator(".article-card")
        .first()
        .evaluate((el) => el === document.activeElement),
    );
    for (const route of ["/contact", "/application"]) {
      await page.goto(base + route);
      await page.locator("form button[type=submit]").click();
      await page.waitForTimeout(150);
      check(
        route + " required errors",
        (await page.locator("[aria-invalid=true]").count()) > 3,
      );
      check(
        route + " error focus",
        await page.evaluate(
          () => document.activeElement.getAttribute("aria-invalid") === "true",
        ),
      );
      await axe(route + " validation accessibility");
      if (
        !(await page
          .getByText("Online delivery is not available yet.", { exact: false })
          .isVisible())
      )
        throw new Error("Live email configured: refusing to submit");
      await page.locator("#firstName").fill("Test");
      await page.locator("#lastName").fill("Visitor");
      await page.locator("#email").fill("test@example.com");
      await page
        .locator("#message")
        .fill("Local validation test. Do not send.");
      await page.locator("#consent").check();
      if (route === "/application")
        await page.locator("#kind").selectOption({ index: 1 });
      await page.locator("form button[type=submit]").click();
      check(
        route + " unavailable no false success",
        (await page.locator(".server-error").isVisible()) &&
          (await page.locator("#form-success").count()) === 0,
      );
    }
    const valid = {
      type: "contact",
      firstName: "Test",
      lastName: "Visitor",
      email: "test@example.com",
      message: "Local validation test. Do not send.",
      consent: true,
      interest: "General enquiry",
    };
    let r = await page.request.post(base + "/api/contact", {
      data: { ...valid, email: "bad" },
    });
    check("API invalid email 400", r.status() === 400);
    r = await page.request.post(base + "/api/contact", {
      data: { ...valid, website: "spam" },
    });
    check("API honeypot no false success", r.status() === 400);
    r = await page.request.post(base + "/api/contact", {
      data: valid,
      headers: { Origin: "https://example.org" },
    });
    check("API rejects cross origin", r.status() === 403);
    for (const width of [360, 390, 430, 768, 1440]) {
      await page.setViewportSize({ width, height: 844 });
      await page.evaluate(() => localStorage.removeItem("cp-cookie-consent"));
      await page.goto(base);
      await page.locator(".cookie-banner").waitFor();
      check(
        `Cookie banner controls fit ${width}px`,
        await page.locator(".cookie-banner button").evaluateAll((elements) =>
          elements.every((element) => {
            const rect = element.getBoundingClientRect();
            return (
              rect.left >= 0 &&
              rect.right <= innerWidth + 1 &&
              rect.top >= 0 &&
              rect.bottom <= innerHeight + 1
            );
          }),
        ),
      );
      if (width === 360) {
        await axe("Mobile cookie banner accessibility");
        await page.screenshot({
          path: "artifacts/rebuild-qa/cookie-banner-360.png",
        });
      }
    }
    fs.writeFileSync(
      "artifacts/rebuild-qa/interactions.json",
      JSON.stringify(checks, null, 2),
    );
    assert(
      checks.every((check) => check.ok),
      "Interaction checks failed",
    );
  } finally {
    await browser.close();
  }
})();
