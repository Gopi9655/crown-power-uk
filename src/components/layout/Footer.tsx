import Link from "next/link";
import { Camera, Link2, Mail, Phone, Users } from "lucide-react";
import { company } from "@/data/site";
import { Logo } from "./Logo";

const columns = [
  { title: "Solutions", links: [["Renewable Integration", "/services#renewable"], ["Smart Energy", "/services#smart"], ["Power Systems", "/services#power"], ["Industrial & Commercial", "/services#industrial"], ["Maintenance & Support", "/services#specialised"]] },
  { title: "Products", links: [["Battery Storage (BESS)", "/bess"], ["Smart Grid Transformers", "/gridtransformer"], ["Battery Products", "/ourproducts"], ["Why Green Energy", "/why-go-solar"]] },
  { title: "Company", links: [["About", "/about"], ["Meet the Team", "/meet-the-team"], ["Partners & Contractors", "/businesspartnercontractor"], ["Internships", "/internships"], ["Announcements", "/statements-announcements"]] },
  { title: "Legal", links: [["Privacy Policy", "/privacy-policy"], ["Cookie Policy", "/cookie-policy"], ["Terms & Conditions", "/terms-conditions"], ["Accessibility", "/accessibility"], ["Health & Safety", "/health-and-safety"], ["Legal Department", "/legaldepartment"]] },
] as const;

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container-wide site-footer__main">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <Logo />
            <p className="site-footer__tagline">Powering Tomorrow&apos;s Solutions.</p>
            <p>Energising Excellence™ — electrical power engineering for renewable integration, smart energy technologies and industrial power systems.</p>
            <div className="social-links" aria-label="Social links">
              <a href={`mailto:${company.email}`} aria-label="Email Crown Power"><Mail size={17} /></a>
              <a href="https://www.linkedin.com/in/aref-mashali-86a877258/" aria-label="LinkedIn"><Link2 size={17} /></a>
              <a href="https://instagram.com/arefmashaliuk" aria-label="Instagram"><Camera size={17} /></a>
              <a href="https://m.facebook.com/aref.mashali.5" aria-label="Facebook"><Users size={17} /></a>
              <a href={`tel:${company.phoneHref}`} aria-label="Call Crown Power"><Phone size={17} /></a>
            </div>
          </div>
          {columns.map((column) => (
            <div key={column.title} className="site-footer__column">
              <h2>{column.title}</h2>
              {column.links.map(([label, href]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          ))}
        </div>

        <div className="office-strip">
          <div><span>Head Office — UK</span><p>West Midlands, England, UK<br /><a href={`mailto:${company.email}`}>{company.email}</a><br /><a href={`tel:${company.phoneHref}`}>{company.phone}</a></p></div>
          <div><span>Branch — Lisbon</span><p>Lisbon, Portugal<br /><a href="mailto:aref.mashali@crownpower.pt">aref.mashali@crownpower.pt</a><br />+351 910 163 080</p></div>
          <div><span>Branch — Dubai</span><p>Arab Bank Bldg, Port Saeed<br />Dubai, United Arab Emirates<br />+971 052 689 7096</p></div>
          <div><span>Legal Department</span><p><a href="mailto:attorneys@crownpoweruk-legals.co.uk">attorneys@crownpoweruk-legals.co.uk</a><br />crownpoweruk-legals.co.uk</p></div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="container-wide">
          <p>Crown Power Energy Systems Ltd — incorporated in England and Wales. Company No. {company.companyNumber} · VAT {company.vatNumber} · Registered Office: {company.registeredOffice}.</p>
          <p>© {new Date().getFullYear()} Crown Power Energy Systems Ltd</p>
        </div>
      </div>
    </footer>
  );
}
