import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import {
  Button,
  Section,
  SectionHeading,
  Photo,
  Process,
  OfficeCards,
  CTASection,
  EnergyFlow,
} from "@/components/ui/Sections";
import { Container } from "@/components/ui/Container";
import home from "@/data/content/Home.json";
import { pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "Powering sustainable, smart & reliable energy systems",
  "Crown Power engineers renewable integration, smart-energy technology and industrial power infrastructure in the UK and internationally.",
  "/",
);
export default function HomePage() {
  return (
    <>
      <PageHero
        home
        eyebrow="Power Engineering · Smart Energy · Renewable Infrastructure"
        title={
          <>
            Powering sustainable, <em>smart</em> &amp; reliable energy systems.
          </>
        }
        description="Crown Power Energy Systems Ltd designs, integrates, installs and maintains renewable energy, smart-energy technology and industrial power infrastructure — engineered for efficiency, reliability and long-term performance."
        image="/images/home/renewable-energy-hero.jpg"
      >
        <Button href="/services">Explore Our Solutions →</Button>
        <Button secondary href="/contact">
          Talk to Our Engineers
        </Button>
      </PageHero>
      <div className="trust-strip">
        <Container>
          {home.trust.map((t) => (
            <div key={t.title}>
              <strong>{t.title}</strong>
              <span>{t.sub}</span>
            </div>
          ))}
        </Container>
      </div>
      <Section>
        <div className="split">
          <div>
            <p className="eyebrow">Who We Are</p>
            <h2>
              Engineering the infrastructure behind a smarter energy future.
            </h2>
            <p>
              Crown Power Energy Systems Ltd is an electrical power engineering
              company serving the UK energy industry. We deliver end-to-end
              services — from design and engineering to installation,
              integration and maintenance — across renewable energy systems,
              smart-energy technologies and conventional power infrastructure.
            </p>
            <p>
              Our solutions are built to improve efficiency, enhance reliability
              and support long-term operational performance for industrial,
              commercial, agricultural and infrastructure sectors.
            </p>
            <Link className="text-link" href="/about">
              About Crown Power →
            </Link>
          </div>
          <div>
            <Photo
              src="/images/home/advanced-power-engineering.jpg"
              alt="Illustrative clean energy infrastructure"
            />
            <div className="image-badge">
              <strong>Excellence Through Innovation</strong>
              <span>Power Through Reliability</span>
            </div>
          </div>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="Core Capabilities"
          title="Five disciplines, one integrated engineering partner."
        />
        <div className="card-grid">
          {home.capabilities.map((c) => (
            <Link className="card image-card" href={c.href} key={c.n}>
              <Photo src={c.img} alt="" />
              <div className="card-body">
                <span className="index">{c.n}</span>
                <h3>{c.title}</h3>
                <p>{c.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <section className="section dark photo-section">
        <Image
          src="/images/home/wind-energy-transition.jpg"
          alt=""
          fill
          sizes="100vw"
        />
        <Container>
          <SectionHeading
            eyebrow="The Energy Transition"
            title="Engineering the transition to cleaner, more resilient power."
            text="From renewable generation to intelligent grids and industrial-grade storage, we help organisations decarbonise without compromising reliability — aligned with the UK's ambition for clean power and warmer, more efficient buildings."
          />
          <Button secondary href="/why-green-energy">
            Why Green Energy →
          </Button>
        </Container>
      </section>
      <Section>
        <SectionHeading
          eyebrow="Featured Technologies"
          title="Products engineered for modern energy networks."
        />
        <div className="card-grid">
          {home.technologies.map((t) => (
            <Link className="feature-card" href={t.href} key={t.tag}>
              <Image
                src={t.img}
                alt=""
                fill
                sizes="(max-width:540px) 100vw, (max-width:900px) 50vw, 33vw"
              />
              <div>
                <span className="index">{t.tag}</span>
                <h3>{t.title}</h3>
                <p>{t.desc}</p>
                <span>Explore {t.tag} →</span>
              </div>
            </Link>
          ))}
        </div>
        <p className="image-caption">
          Energy photography is illustrative; confirmed product imagery is
          identified on product pages.
        </p>
      </Section>
      <Section tone="dark">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Power infrastructure for every operating environment."
        />
        <div className="card-grid industry-grid">
          {home.industries.map((i) => (
            <Link
              className="feature-card"
              href="/services#sectors"
              key={i.title}
            >
              <Image
                src={i.img}
                alt=""
                fill
                sizes="(max-width:540px) 100vw, 33vw"
              />
              <div>
                <h3>{i.title}</h3>
                <p>{i.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </Section>
      <Section tone="dark">
        <div className="section-heading centre-heading">
          <p className="eyebrow">Smart Energy Systems</p>
          <h2>
            Intelligent grids that balance generation, storage and demand.
          </h2>
          <p>
            Smart grid solutions, energy management systems, SCADA and remote
            monitoring keep power flowing efficiently — from renewable sources
            through storage to the customers who depend on it.
          </p>
        </div>
        <EnergyFlow />
      </Section>
      <Section>
        <SectionHeading
          eyebrow="How We Work"
          title="A disciplined, end-to-end engineering process."
        />
        <Process items={home.process} />
      </Section>
      <Section tone="surface">
        <div className="card-grid columns-2">
          <Link className="feature-card" href="/about">
            <Image
              src="/images/company/crown-power-team.jpg"
              alt=""
              fill
              sizes="(max-width:540px) 100vw, 50vw"
            />
            <div>
              <h3>Engineering reliability into every system.</h3>
              <p>
                Quality, innovation and tailored engineering — across the UK,
                Portugal and the UAE.
              </p>
              <span>About Crown Power →</span>
            </div>
          </Link>
          <Link className="feature-card" href="/internships">
            <Image
              src="/images/services/power-systems.jpg"
              alt=""
              fill
              sizes="(max-width:540px) 100vw, 50vw"
            />
            <div>
              <span className="index">Early Careers</span>
              <h3>Experience that powers your future.</h3>
              <p>
                Practical, industry-focused internships and work experience for
                university students across engineering, energy, technology and
                business.
              </p>
              <span>Explore Internships →</span>
            </div>
          </Link>
        </div>
      </Section>
      <Section>
        <SectionHeading
          eyebrow="Global Presence"
          title="UK-headquartered, internationally connected."
        />
        <OfficeCards />
      </Section>
      <CTASection
        secondary={{ label: "Contact Crown Power", href: "/contact" }}
      />
    </>
  );
}
