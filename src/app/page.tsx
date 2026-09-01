import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BatteryCharging, Factory, Network, SunMedium } from "lucide-react";
import { announcements, offices, services } from "@/data/site";
import { CTASection } from "@/components/ui/CTASection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Powering Sustainable, Smart & Reliable Energy Systems",
  description: "Electrical power engineering for renewable integration, smart energy technologies, battery storage and industrial power systems.",
  alternates: { canonical: "/" },
};

const trust = [
  ["Registered in England & Wales", "Company No. 16070400"],
  ["Electrical power engineering", "Design · install · maintain"],
  ["International presence", "UK · Portugal · UAE"],
  ["Quality-led engineering", "Structured delivery and support"],
];

const technologies = [
  { tag: "BESS", title: "Battery Energy Storage Systems", text: "Scalable storage for peak management, renewable integration and grid resilience.", href: "/bess", image: "/images/bess/battery-energy-storage.jpg" },
  { tag: "Transformers", title: "Smart Grid Transformers", text: "Intelligent distribution and monitoring for efficient, reliable networks.", href: "/gridtransformer", image: "/images/services/specialised-services.jpg" },
  { tag: "Batteries", title: "Battery Products", text: "Alkaline, NiMH and lithium-ion cells across common formats.", href: "/ourproducts", image: "/images/bess/battery-products.jpg" },
];

const industries = [
  ["Industrial", "Manufacturing & processing", "/images/services/power-systems.jpg"],
  ["Commercial", "Offices, retail & hospitality", "/images/services/industrial-commercial.jpg"],
  ["Infrastructure", "Telecoms, transport & utilities", "/images/home/advanced-power-engineering.jpg"],
  ["Agriculture", "Farms, greenhouses & storage", "/images/services/renewable-integration.jpg"],
  ["Energy & Utilities", "Generation & distribution", "/images/home/wind-energy-transition.jpg"],
  ["Data Centres", "Critical, resilient power", "/images/services/smart-energy-technologies.jpg"],
];

const process = [
  ["STEP 01", "Assess", "Site assessment, energy audit and feasibility to define the right approach."],
  ["STEP 02", "Engineer", "System design, specification and technical planning for your requirements."],
  ["STEP 03", "Integrate", "Installation and integration with existing infrastructure and controls."],
  ["STEP 04", "Commission", "Testing, commissioning and handover to verified operational standards."],
  ["STEP 05", "Support", "Preventive maintenance, monitoring and long-term technical support."],
];

export default function HomePage() {
  return (
    <>
      <section className="home-hero">
        <Image src="/images/home/renewable-energy-hero.jpg" alt="Solar panels and wind turbines in a renewable energy landscape" fill priority sizes="100vw" className="home-hero__image" />
        <div className="home-hero__scrim" />
        <Container className="home-hero__inner">
          <div className="home-hero__content">
            <p className="hero-eyebrow"><span />Power Engineering · Smart Energy · Renewable Infrastructure</p>
            <h1>Powering sustainable, <span>smart</span> &amp; reliable energy systems.</h1>
            <p className="home-hero__lead">Crown Power Energy Systems Ltd designs, integrates, installs and maintains renewable energy, smart-energy technology and industrial power infrastructure — engineered for efficiency, reliability and long-term performance.</p>
            <div className="hero-actions">
              <Link href="/services" className="button button--gold">Explore our solutions <span aria-hidden="true">→</span></Link>
              <Link href="/contact" className="button button--outline-light">Talk to our engineers</Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="trust-strip" aria-label="Company facts">
        <Container className="trust-strip__grid">
          {trust.map(([title, detail]) => <div key={title}><strong>{title}</strong><span>{detail}</span></div>)}
        </Container>
      </section>

      <section className="section">
        <Container className="split-grid">
          <div className="split-copy">
            <p className="eyebrow">Who We Are</p>
            <h2>Engineering the infrastructure behind a smarter energy future.</h2>
            <p>Crown Power Energy Systems Ltd is an electrical power engineering company serving the UK energy industry. We deliver end-to-end services — from design and engineering to installation, integration and maintenance.</p>
            <p>Our solutions support efficient, reliable and future-ready operations across industrial, commercial, agricultural and infrastructure sectors.</p>
            <Link href="/about" className="text-link">About Crown Power <span aria-hidden="true">→</span></Link>
          </div>
          <div className="split-image">
            <Image src="/images/home/advanced-power-engineering.jpg" alt="Engineer working with advanced power infrastructure" width={1200} height={900} />
            <div className="image-note"><strong>Excellence Through Innovation</strong><span>Power Through Reliability</span></div>
          </div>
        </Container>
      </section>

      <section className="section section--offwhite">
        <Container>
          <SectionHeading eyebrow="Core Capabilities" title="Five disciplines, one integrated engineering partner." />
          <div className="capability-grid">
            {services.map((service) => (
              <Link key={service.id} href={`/services#${service.id}`} className="capability-card">
                <div className="capability-card__image"><Image src={service.image} alt={service.title} fill sizes="(max-width: 620px) 100vw, (max-width: 1120px) 50vw, 33vw" /></div>
                <div className="capability-card__body"><span className="capability-card__number">{service.number}</span><h3>{service.title}</h3><p>{service.description}</p></div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="transition-section">
        <Image src="/images/home/wind-energy-transition.jpg" alt="Wind turbines supporting the energy transition" fill sizes="100vw" className="transition-section__image" />
        <div className="transition-section__scrim" />
        <Container><div className="transition-section__content"><p className="eyebrow">The Energy Transition</p><h2>Engineering the transition to cleaner, more resilient power.</h2><p>From renewable generation to intelligent grids and industrial-grade storage, we help organisations decarbonise without compromising reliability — aligned with the UK&apos;s clean-power ambition.</p><Link href="/why-go-solar" className="button button--outline-light">Why green energy <span aria-hidden="true">→</span></Link></div></Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeading eyebrow="Featured Technologies" title="Products engineered for modern energy networks." />
          <div className="technology-grid">
            {technologies.map((technology) => <Link key={technology.title} href={technology.href} className="technology-card"><Image src={technology.image} alt={technology.title} fill sizes="(max-width:620px) 100vw, 33vw" /><div className="technology-card__scrim" /><div className="technology-card__body"><span>{technology.tag}</span><h3>{technology.title}</h3><p>{technology.text}</p><span className="technology-card__link">Explore {technology.tag} <span aria-hidden="true">→</span></span></div></Link>)}
          </div>
        </Container>
      </section>

      <section className="section section--navy">
        <Container>
          <SectionHeading eyebrow="Industries We Serve" title="Power infrastructure for every operating environment." light />
          <div className="industry-grid">
            {industries.map(([title, text, image]) => <Link key={title} href="/services#sectors" className="industry-card"><Image src={image} alt="" fill sizes="(max-width:620px) 100vw, 33vw" /><div className="industry-card__scrim" /><div className="industry-card__body"><h3>{title}</h3><p>{text}</p></div></Link>)}
          </div>
        </Container>
      </section>

      <section className="section section--midnight">
        <Container>
          <SectionHeading eyebrow="Smart Energy Systems" title="Intelligent grids that balance generation, storage and demand." text="Smart-grid solutions, energy management, SCADA and remote monitoring keep power flowing efficiently." light centered />
          <div className="flow-list" aria-label="Energy flow from renewable generation to industry">
            {[[SunMedium,"Renewable"],[BatteryCharging,"Storage"],[Network,"Smart Grid"],[Factory,"Industry"]].map(([Icon,label]) => {
              const IconComponent = Icon as typeof SunMedium;
              return <div key={label as string} className="flow-item"><span className="flow-item__icon"><IconComponent size={31} strokeWidth={1.6} aria-hidden="true" /></span><span>{label as string}</span></div>;
            })}
          </div>
        </Container>
      </section>

      <section className="section">
        <Container><SectionHeading eyebrow="How We Work" title="A disciplined, end-to-end engineering process." /><div className="process-grid">{process.map(([step,title,text]) => <div key={step} className="process-card"><span>{step}</span><h3>{title}</h3><p>{text}</p></div>)}</div></Container>
      </section>

      <section className="section section--offwhite">
        <Container>
          <SectionHeading eyebrow="Company Updates" title="Statements and announcements." />
          <div className="announcement-grid">{announcements.slice(0,3).map((item) => <article key={item.title} className="announcement-card"><div className="announcement-card__meta"><span>{item.category}</span><time>{item.date}</time></div><h2>{item.title}</h2><p>{item.summary}</p></article>)}</div>
          <p style={{marginTop:28}}><Link href="/statements-announcements" className="text-link">View all announcements <span aria-hidden="true">→</span></Link></p>
        </Container>
      </section>

      <section className="section">
        <Container className="feature-pair">
          <article className="feature-panel"><Image src="/images/company/crown-power-team.jpg" alt="Crown Power team and engineering" fill sizes="(max-width:620px) 100vw, 50vw" /><div className="feature-panel__scrim" /><div className="feature-panel__body"><h3>Engineering reliability into every system.</h3><p>Quality, innovation and tailored engineering across the UK, Portugal and the UAE.</p><Link href="/about">About Crown Power <span aria-hidden="true">→</span></Link></div></article>
          <article className="feature-panel"><Image src="/images/services/power-systems.jpg" alt="Early careers in power engineering" fill sizes="(max-width:620px) 100vw, 50vw" /><div className="feature-panel__scrim" /><div className="feature-panel__body"><h3>Experience that powers your future.</h3><p>Industry-focused internships and work experience across engineering, energy, technology and business.</p><Link href="/internships">Explore internships <span aria-hidden="true">→</span></Link></div></article>
        </Container>
      </section>

      <section className="section section--offwhite">
        <Container><SectionHeading eyebrow="Global Presence" title="UK-headquartered, internationally connected." centered /><div className="office-grid">{offices.map((office) => <article key={office.city} className="office-card"><span>{office.country}</span><h3>{office.city}</h3><p>{office.detail}</p><a href={office.contact.includes("@") ? `mailto:${office.contact}` : `tel:${office.contact}`}>{office.contact}</a></article>)}</div></Container>
      </section>

      <CTASection title="Let's build smarter energy infrastructure." text="Talk to our engineers about renewable integration, smart-energy technology or industrial power systems for your next project." label="Start a conversation" secondary={{label:"Contact Crown Power",href:"/contact"}} />
    </>
  );
}
