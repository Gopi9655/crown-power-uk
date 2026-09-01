import Link from "next/link";
import { Container } from "./Container";

export function CTASection({ title, text, label = "Contact Crown Power", href = "/contact#enquiry", secondary }: { title: string; text: string; label?: string; href?: string; secondary?: { label: string; href: string } }) {
  return (
    <section className="cta-section">
      <Container>
        <h2>{title}</h2>
        <p>{text}</p>
        <div className="cta-section__actions">
          <Link href={href} className="button button--gold">{label} <span aria-hidden="true">→</span></Link>
          {secondary && <Link href={secondary.href} className="button button--outline-light">{secondary.label}</Link>}
        </div>
      </Container>
    </section>
  );
}
