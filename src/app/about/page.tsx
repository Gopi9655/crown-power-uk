import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import {
  Section,
  SectionHeading,
  Photo,
  Cards,
  OfficeCards,
  CTASection,
} from "@/components/ui/Sections";
import { Container } from "@/components/ui/Container";
import about from "@/data/content/About.json";
import { pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "About Crown Power",
  "Our engineering focus, approach, international presence, leadership and corporate identity.",
  "/about",
);
export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Crown Power"
        title="Engineering reliability into every system."
        description="An electrical power engineering company focused on sustainable energy solutions for the UK energy industry — and beyond."
        image="/images/company/about-hero.jpg"
      />
      <Section>
        <div className="split">
          <div>
            <p className="eyebrow">Who We Are</p>
            <h2>A power engineering partner for the energy transition.</h2>
            <p>
              Crown Power Energy Systems Ltd specialises in renewable energy
              integration, smart-energy technologies and industrial-grade power
              systems. We design, install and maintain efficient, future-ready
              solutions for industrial, commercial, agricultural and
              infrastructure sectors.
            </p>
            <p>
              Our end-to-end approach — from engineering and design to
              installation, integration and maintenance — is built to improve
              efficiency, enhance reliability and support long-term operational
              performance.
            </p>
          </div>
          <Photo
            src="/images/company/about-engineering.jpg"
            alt="Illustrative sustainable energy landscape"
          />
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="Our Approach"
          title="Principles that guide every engagement."
        />
        <Cards items={about.pillars} columns={4} />
      </Section>
      <Section tone="dark">
        <div className="mission-grid">
          {about.mvv.map((m) => (
            <div key={m.label}>
              <h2>{m.label}</h2>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      </Section>
      <section className="section dark photo-section">
        <Image
          src="/images/company/uk-sustainability.jpg"
          alt=""
          fill
          sizes="100vw"
        />
        <Container>
          <SectionHeading
            eyebrow="Sustainability"
            title="Aligned with the ambition for clean, affordable power."
            text="We support the UK's transition toward clean power — helping organisations lower emissions and energy costs through renewable integration, storage and intelligent energy management, without compromising reliability."
          />
        </Container>
      </section>
      <Section>
        <SectionHeading
          eyebrow="International Presence"
          title="UK-headquartered, with branches in Europe and the Gulf."
        />
        <OfficeCards />
      </Section>
      <Section tone="surface">
        <div className="split split-top">
          <div>
            <Image
              src="/images/brand/crown-power-logo.png"
              alt="Crown Power Energy Systems logo"
              width={130}
              height={195}
              className="corporate-logo"
            />
            <p className="eyebrow">Company Information</p>
            <h2>Crown Power Energy Systems Ltd</h2>
            <dl className="company-details">
              {about.companyInfo.map((c) => (
                <div key={c.k}>
                  <dt>{c.k}</dt>
                  <dd>{c.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="stack">
            <article className="card">
              <h3>Leadership &amp; Team</h3>
              <p>
                Mr Aref Mashali is Company Director. Meet the people engineering
                Crown Power&apos;s solutions.
              </p>
              <Link className="text-link" href="/team">
                Meet the Team →
              </Link>
            </article>
            <article className="card">
              <h3>Careers &amp; Internships</h3>
              <p>
                Explore early-career opportunities across engineering, energy,
                technology and business.
              </p>
              <Link className="text-link" href="/internships">
                Explore Opportunities →
              </Link>
            </article>
            <article className="card">
              <h3>Partners &amp; Contractors</h3>
              <p>
                Discuss technology, supply and project delivery with Crown
                Power.
              </p>
              <Link className="text-link" href="/partners">
                Work with us →
              </Link>
            </article>
          </div>
        </div>
      </Section>
      <CTASection
        title="Work with Crown Power."
        text="Whether you're planning a project or exploring partnership, we'd like to hear from you."
        label="Contact Crown Power →"
        href="/contact"
      />
    </>
  );
}
