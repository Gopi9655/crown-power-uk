"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";
export function CookieConsent() {
  const [banner, setBanner] = useState(false);
  const [preferences, setPreferences] = useState(false);
  const [notice, setNotice] = useState("");
  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(
          localStorage.getItem("cp-cookie-consent") || "null",
        );
        if (
          !saved ||
          saved.version !== 1 ||
          typeof saved.ts !== "number" ||
          Date.now() - saved.ts > 180 * 86400000
        )
          setBanner(true);
      } catch {
        setBanner(true);
      }
    }, 600);
    return () => clearTimeout(timer);
  }, []);
  function save(choice: string) {
    try {
      localStorage.setItem(
        "cp-cookie-consent",
        JSON.stringify({
          version: 1,
          choice,
          analytics: false,
          functional: false,
          marketing: false,
          ts: Date.now(),
        }),
      );
      setNotice("Cookie preferences saved. No optional cookies are active.");
    } catch {
      setNotice(
        "Your browser could not save preferences. No optional cookies are active.",
      );
    }
    setBanner(false);
    setPreferences(false);
  }
  return (
    <>
      <button className="text-button" onClick={() => setPreferences(true)}>
        Cookie Settings
      </button>
      <span className="sr-only" role="status">
        {notice}
      </span>
      {banner && (
        <section className="cookie-banner" aria-label="Cookie consent">
          <div>
            <strong>We value your privacy</strong>
            <p>
              This site stores your cookie choice on your device. No analytics,
              functional or marketing cookies are currently used.{" "}
              <Link href="/cookies">Cookie Policy</Link>
            </p>
          </div>
          <div className="actions">
            <button
              className="button button-secondary"
              onClick={() => setPreferences(true)}
            >
              Manage preferences
            </button>
            <button
              className="button button-secondary"
              onClick={() => save("reject")}
            >
              Reject optional cookies
            </button>
            <button
              className="button button-secondary"
              onClick={() => save("accept")}
            >
              Accept optional cookies
            </button>
          </div>
        </section>
      )}
      {preferences && (
        <Modal title="Cookie preferences" onClose={() => setPreferences(false)}>
          <h2>Cookie preferences</h2>
          <p>
            Only necessary storage is used. Optional categories are unavailable
            because this site does not use them.
          </p>
          <div className="cookie-category">
            <div>
              <strong>Strictly necessary</strong>
              <p>Stores your cookie choice for up to six months.</p>
            </div>
            <span>Always on</span>
          </div>
          {["Analytics", "Functional", "Marketing"].map((category) => (
            <div className="cookie-category" key={category}>
              <strong>{category}</strong>
              <span>Not used</span>
            </div>
          ))}
          <div className="actions">
            <button
              className="button button-outline"
              onClick={() => save("reject")}
            >
              Reject optional cookies
            </button>
            <button
              className="button button-primary"
              onClick={() => save("necessary")}
            >
              Save preferences
            </button>
          </div>
        </Modal>
      )}
    </>
  );
}
