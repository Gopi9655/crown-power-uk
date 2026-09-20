"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
import { Logo } from "./Logo";
import { Modal } from "../ui/Modal";
export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState<number | null>(null);
  const [mobile, setMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const header = useRef<HTMLElement>(null);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  useEffect(() => {
    const scroll = () => setScrolled(window.scrollY > 24);
    scroll();
    window.addEventListener("scroll", scroll, { passive: true });
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(null);
    };
    document.addEventListener("pointerdown", outside);
    const resize = () => {
      if (window.innerWidth >= 1180) setMobile(false);
      else setOpen(null);
    };
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("scroll", scroll);
      document.removeEventListener("pointerdown", outside);
      window.removeEventListener("resize", resize);
    };
  }, []);
  const close = () => {
    setOpen(null);
    setMobile(false);
  };
  return (
    <header
      ref={header}
      className={`site-header ${pathname === "/" && !scrolled && open === null ? "header-overlay" : ""}`}
      onKeyDown={(event) => {
        if (event.key === "Escape" && open !== null) {
          buttons.current[open]?.focus();
          setOpen(null);
        }
      }}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setOpen(null);
      }}
    >
      <div className="site-container header-bar">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          {navigation.map((menu, i) => (
            <button
              key={menu.label}
              ref={(node) => {
                buttons.current[i] = node;
              }}
              type="button"
              aria-expanded={open === i}
              aria-controls={`nav-panel-${i}`}
              onClick={() => setOpen(open === i ? null : i)}
            >
              {menu.label}
              <span aria-hidden="true">⌄</span>
            </button>
          ))}
        </nav>
        <div className="header-actions">
          <Link
            className="button button-secondary"
            href="/contact"
            onClick={close}
          >
            Contact
          </Link>
          <Link
            className="button button-primary"
            href="/contact#enquiry"
            onClick={close}
          >
            Request Consultation →
          </Link>
        </div>
        <button
          className="icon-button mobile-toggle"
          type="button"
          aria-label="Open navigation"
          aria-expanded={mobile}
          onClick={() => setMobile(true)}
        >
          ☰
        </button>
      </div>
      {navigation.map((menu, i) => (
        <div
          key={menu.label}
          id={`nav-panel-${i}`}
          className="mega-menu"
          hidden={open !== i}
        >
          <div className="site-container">
            <p className="eyebrow">{menu.label}</p>
            <div className="mega-grid">
              {menu.items.map((item) => (
                <Link key={item.label} href={item.href} onClick={close}>
                  <strong>{item.label}</strong>
                  <span>{item.desc}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      ))}
      {mobile && (
        <Modal title="Navigation" onClose={close} className="mobile-nav">
          <Logo />
          <nav aria-label="Mobile navigation">
            {navigation.map((menu) => (
              <details key={menu.label}>
                <summary>{menu.label}</summary>
                {menu.items.map((item) => (
                  <Link key={item.label} href={item.href} onClick={close}>
                    {item.label}
                  </Link>
                ))}
              </details>
            ))}
            <Link href="/contact" onClick={close}>
              Contact
            </Link>
            <Link
              className="button button-primary"
              href="/contact#enquiry"
              onClick={close}
            >
              Request Consultation →
            </Link>
          </nav>
        </Modal>
      )}
    </header>
  );
}
