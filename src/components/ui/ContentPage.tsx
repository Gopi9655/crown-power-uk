import Image from "next/image";
import Link from "next/link";
import { siteUrl, type ContentPage as ContentPageData } from "@/data/site";
import { CTASection } from "./CTASection";
import { Container } from "./Container";
import { PageHero } from "./PageHero";

export function ContentPage({ page }: { page: ContentPageData }) {
  const document = page.type === "document";
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
      { "@type": "ListItem", position: 2, name: page.title, item: `${siteUrl}/${page.slug}` },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c") }} />
      <PageHero eyebrow={page.eyebrow} title={page.title} intro={page.intro} image={page.image} />
      <section className={document ? "document-section" : "content-section"}>
        <Container className={document ? "document-layout" : "content-layout"}>
          {document && (
            <aside className="document-toc" aria-label="On this page">
              <p>On this page</p>
              <ol>{page.sections.map((section, index) => <li key={section.heading}><Link href={`#section-${index + 1}`}>{section.heading}</Link></li>)}</ol>
            </aside>
          )}
          <div className={document ? "document-copy" : "content-copy"}>
            {page.image && !document && <Image src={page.image} alt="" width={1200} height={720} className="content-feature-image" />}
            {page.sections.map((section, index) => (
              <section key={section.heading} id={`section-${index + 1}`}>
                <h2>{section.heading}</h2>
                {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                {section.bullets && <ul>{section.bullets.map((item) => <li key={item}>{item}</li>)}</ul>}
              </section>
            ))}
            {document && <p className="document-updated">Last reviewed: 1 September 2026</p>}
          </div>
        </Container>
      </section>
      {page.cta && <CTASection title={page.cta.title} text={page.cta.text} label={page.cta.label} href={page.cta.href} />}
    </>
  );
}
