"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navigation } from "@/data/site";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const mobilePanel = useRef<HTMLDivElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusTimer = window.setTimeout(() => closeButton.current?.focus(), 50);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        requestAnimationFrame(() => menuButton.current?.focus());
      }
      if (event.key === "Tab") {
        const focusable = Array.from(
          mobilePanel.current?.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ) ?? [],
        ).filter((element) => element.getClientRects().length > 0);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
      window.clearTimeout(focusTimer);
    };
  }, [mobileOpen]);

  const overlayRoutes = ["/", "/about", "/bess", "/gridtransformer"];
  const hasImageHero = overlayRoutes.includes(pathname);
  const solid = !hasImageHero || scrolled || activeMenu !== null || mobileOpen;

  return (
    <header
      className={`site-header ${solid ? "site-header--solid" : "site-header--overlay"}`}
      onMouseLeave={() => setActiveMenu(null)}
    >
      <div className="site-header__bar container-wide">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navigation.map((group) => {
            const selected = activeMenu === group.label;
            const current = group.items.some((item) => pathname === item.href.split("#")[0]);
            return (
              <button
                key={group.label}
                type="button"
                className={`desktop-nav__button ${current ? "is-current" : ""}`}
                aria-expanded={selected}
                aria-controls="mega-menu"
                onMouseEnter={() => setActiveMenu(group.label)}
                onFocus={() => setActiveMenu(group.label)}
                onClick={() => setActiveMenu(selected ? null : group.label)}
              >
                {group.label} <ChevronDown size={14} aria-hidden="true" />
              </button>
            );
          })}
        </nav>
        <div className="header-actions">
          <Link href="/contact" className="button button--outline-light button--small">Contact</Link>
          <Link href="/contact#enquiry" className="button button--gold button--small">Request consultation <span aria-hidden="true">→</span></Link>
        </div>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          aria-label="Open navigation menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen(true)}
        >
          <Menu size={23} />
        </button>
      </div>

      <div id="mega-menu" className={`mega-menu ${activeMenu ? "is-open" : ""}`} aria-hidden={!activeMenu}>
        <div className="container-wide mega-menu__inner">
          <p className="mega-menu__label">{activeMenu}</p>
          <div className="mega-menu__grid">
            {navigation.find((group) => group.label === activeMenu)?.items.map((item) => (
              <Link key={`${item.href}-${item.label}`} href={item.href} className="mega-menu__link" onClick={() => setActiveMenu(null)}>
                <span>{item.label}</span>
                <small>{item.description}</small>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div ref={mobilePanel} className={`mobile-menu ${mobileOpen ? "is-open" : ""}`} aria-hidden={!mobileOpen}>
        <div className="mobile-menu__header">
          <Logo compact />
          <button ref={closeButton} type="button" className="menu-toggle" aria-label="Close navigation menu" onClick={() => setMobileOpen(false)}>
            <X size={23} />
          </button>
        </div>
        <nav className="mobile-menu__body" aria-label="Mobile navigation">
          {navigation.map((group) => (
            <section key={group.label} className="mobile-menu__section" aria-labelledby={`mobile-${group.label}`}>
              <h2 id={`mobile-${group.label}`}>{group.label}</h2>
              {group.items.map((item) => <Link key={`${item.href}-${item.label}`} href={item.href} onClick={() => setMobileOpen(false)}>{item.label}</Link>)}
            </section>
          ))}
          <div className="mobile-menu__actions">
            <Link href="/contact" className="button button--outline-light" onClick={() => setMobileOpen(false)}>Contact</Link>
            <Link href="/contact#enquiry" className="button button--gold" onClick={() => setMobileOpen(false)}>Request consultation <span aria-hidden="true">→</span></Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
