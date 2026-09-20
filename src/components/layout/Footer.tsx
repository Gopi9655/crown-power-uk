import Link from "next/link";
import {
  company,
  navigation,
  offices,
  policyLinks,
  socialLinks,
} from "@/data/site";
import { Logo } from "./Logo";
import { CookieConsent } from "./CookieConsent";
export function Footer() {
  const groups = [
    navigation[0],
    navigation[1],
    navigation[3],
    { label: "Legal", items: policyLinks },
  ];
  return (
    <footer className="site-footer">
      <div className="site-container">
        <div className="footer-grid">
          <div className="footer-brand">
            <Logo />
            <p className="footer-tagline">
              Powering Tomorrow&apos;s Solutions.
            </p>
            <p>
              Energising Excellence™ — an electrical power engineering company
              delivering renewable integration, smart energy technologies and
              industrial power systems across the UK and internationally.
            </p>
            <div className="social-links">
              {socialLinks.slice(0, 4).map((s) => (
                <a key={s.label} href={s.href}>
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
          {groups.map((group) => (
            <nav key={group.label} aria-label={`Footer ${group.label}`}>
              <h2>{group.label}</h2>
              {group.items.map((item) => (
                <Link key={item.label} href={item.href}>
                  {item.label}
                </Link>
              ))}
              {group.label === "Products" && (
                <Link href="/why-green-energy">Why Green Energy</Link>
              )}
              {group.label === "Company" && (
                <>
                  <Link href="/announcements">Announcements</Link>
                  <Link href="/application">Application</Link>
                </>
              )}
            </nav>
          ))}
        </div>
        <div className="footer-offices">
          {offices.map((o) => (
            <div key={o.city}>
              <h2>
                {o.city === "West Midlands"
                  ? "Head Office — UK"
                  : `Branch — ${o.city}`}
              </h2>
              <p>{o.detail}</p>
              {o.email && <a href={`mailto:${o.email}`}>{o.email}</a>}
              <a href={`tel:${o.tel}`}>{o.phone}</a>
            </div>
          ))}
          <div>
            <h2>Legal Department</h2>
            <a href={`mailto:${company.legalEmail}`}>{company.legalEmail}</a>
            <a href="https://crownpoweruk-legals.co.uk">
              crownpoweruk-legals.co.uk ↗
            </a>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-policy-links">
            {policyLinks.slice(0, 4).map((p) => (
              <Link key={p.href} href={p.href}>
                {p.label}
              </Link>
            ))}
            <CookieConsent />
          </div>
          <p>
            {company.name} — a private company incorporated in England and
            Wales. Company No. {company.companyNumber} · VAT {company.vatNumber}{" "}
            · Registered Office: {company.registeredOffice}.
          </p>
          <p>
            © {new Date().getFullYear()} {company.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
