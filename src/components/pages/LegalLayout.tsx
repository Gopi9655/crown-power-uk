import Link from "next/link";
import { Container } from "../ui/Container";
import { Section, ReviewNote } from "../ui/Sections";
import type { LegalContent } from "@/data/legal";
export function LegalLayout({ page }: { page: LegalContent }) {
  const toc = (
    <nav aria-label="Policy contents">
      {page.sections.map((s) => (
        <a href={`#${s.id}`} key={s.id}>
          {s.h}
        </a>
      ))}
    </nav>
  );
  return (
    <>
      <section className="legal-hero">
        <Container>
          <nav aria-label="Breadcrumb" className="breadcrumbs">
            <Link href="/">Home</Link>
            <span aria-hidden="true">/</span>
            <span>{page.eyebrow}</span>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{page.title}</span>
          </nav>
          <p className="eyebrow">{page.eyebrow}</p>
          <h1>{page.title}</h1>
          <p>{page.summary}</p>
          <span className="legal-updated">{page.updated}</span>
        </Container>
      </section>
      <Section>
        <div className="legal-grid">
          <aside className="legal-toc">
            <strong>On this page</strong>
            {toc}
          </aside>
          <div className="legal-copy">
            <details className="mobile-toc">
              <summary>On this page</summary>
              {toc}
            </details>
            <ReviewNote title="Legal / company review required">
              <p>{page.reviewNote}</p>
            </ReviewNote>
            {page.title === "Cookie Policy" && (
              <aside className="review-note">
                <strong>Current implementation</strong>
                <p>
                  This build uses only local storage (
                  <code>cp-cookie-consent</code>) to remember your cookie choice
                  for up to six months. Analytics, functional and marketing
                  cookies are not used. No third-party tracking scripts are
                  loaded.
                </p>
              </aside>
            )}
            {page.sections.map((s) => (
              <section className="legal-section" id={s.id} key={s.id}>
                <h2>{s.h}</h2>
                {s.paras.map((p) => (
                  <p key={p}>{p}</p>
                ))}
                {s.list && (
                  <ul>
                    {s.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
            <section className="legal-contact">
              <h2>{page.contactHeading}</h2>
              <p>{page.contactNote}</p>
              <a href={`mailto:${page.contactEmail}`}>{page.contactEmail}</a>
            </section>
            <nav className="related-links" aria-label="Related pages">
              {page.related.map((r) => (
                <Link href={r.href} key={r.href}>
                  {r.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </Section>
    </>
  );
}
