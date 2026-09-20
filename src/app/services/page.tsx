import { PageHero } from "@/components/ui/PageHero";
import { ServiceCategoryNav } from "@/components/ui/ServiceCategoryNav";
import {
  Section,
  SectionHeading,
  Photo,
  Checklist,
  CTASection,
} from "@/components/ui/Sections";
import { services, sectors, liveData, pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "Services & Capabilities",
  "Thirty electrical power engineering capabilities across renewable integration, smart energy, power systems, industrial services and specialist support.",
  "/services",
);
export default function ServicesPage() {
  return (
    <div className="services-page">
      <PageHero
        eyebrow="Services & Capabilities"
        title="Engineering solutions for modern power infrastructure."
        description="Crown Power Energy Systems Ltd delivers end-to-end electrical power engineering — organised into five connected disciplines spanning renewable energy, smart-energy technology and industrial power systems."
      />
      <ServiceCategoryNav />
      <Section>
        <div className="service-rows">
          {services.map((s) => (
            <section className="split service-row" id={s.id} key={s.id}>
              <Photo
                src={s.img}
                alt={`Illustrative ${s.title.toLowerCase()} infrastructure`}
              />
              <div>
                <span className="index">{s.n}</span>
                <h2>{s.title}</h2>
                <p>{s.blurb}</p>
                <Checklist items={s.items} />
              </div>
            </section>
          ))}
        </div>
      </Section>
      <Section tone="surface" id="sectors">
        <SectionHeading
          eyebrow="Target Sectors"
          title="Delivering across industrial, commercial, infrastructure and agricultural settings."
        />
        <div className="card-grid columns-2">
          {sectors.map((s) => (
            <article className="card" key={s.title}>
              <h3>{s.title}</h3>
              <ul className="sector-list">
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="dark" id="live">
        <SectionHeading
          eyebrow="Live Energy Data"
          title="Real-time insight into the UK & European grid."
          text="Independent dashboards for generation mix, carbon intensity and grid status. These links open external websites."
        />
        <div className="live-links">
          {liveData.map((d) => (
            <a
              key={d.href}
              href={d.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              {d.title}
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ))}
        </div>
      </Section>
      <CTASection
        title="Have a project in mind?"
        text="Tell us about your requirements and our engineers will scope the right solution."
        label="Request a Consultation →"
      />
    </div>
  );
}
