import type { Metadata } from "next";
import Image from "next/image";
import { Check, ExternalLink } from "lucide-react";
import { CTASection } from "@/components/ui/CTASection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { liveData, sectors, services } from "@/data/site";

export const metadata: Metadata = { title: "Services", description: "Renewable integration, smart energy, power systems, industrial services and specialist support.", alternates: { canonical: "/services" } };

export default function ServicesPage() {
  return <>
    <PageHero eyebrow="Services & Capabilities" title="Engineering solutions for modern power infrastructure." intro="End-to-end electrical power engineering across five connected disciplines spanning renewable energy, smart-energy technology and industrial power systems." />
    <nav className="service-anchor-nav" aria-label="Service categories"><Container className="service-anchor-nav__inner">{services.map((service) => <a key={service.id} href={`#${service.id}`}>{service.title}</a>)}</Container></nav>
    <section className="section"><Container className="service-list">{services.map((service) => <article key={service.id} id={service.id} className="service-row"><div className="service-row__image"><Image src={service.image} alt={service.title} width={1000} height={760} /></div><div className="service-row__copy"><span>{service.number}</span><h2>{service.title}</h2><p>{service.description}</p><ul className="check-grid">{service.items.map((item) => <li key={item}><Check size={17} strokeWidth={2.4} aria-hidden="true" />{item}</li>)}</ul></div></article>)}</Container></section>
    <section id="sectors" className="section section--offwhite"><Container><SectionHeading eyebrow="Target Sectors" title="Delivering across industrial, commercial, infrastructure and agricultural settings." /><div className="sector-grid">{sectors.map((sector) => <article key={sector.title} className="sector-card"><h3>{sector.title}</h3><ul>{sector.items.map((item) => <li key={item}>{item}</li>)}</ul></article>)}</div></Container></section>
    <section className="section section--midnight"><Container><SectionHeading eyebrow="Live Energy Data" title="Real-time insight into the UK & European grid." text="Independent dashboards for generation mix, carbon intensity and grid status." light /><div className="live-grid">{liveData.map((item) => <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="live-card"><span>{item.title}</span><ExternalLink size={17} aria-hidden="true" /></a>)}</div></Container></section>
    <CTASection title="Have a project in mind?" text="Tell us about your requirements and our engineers will scope the right solution." label="Request a consultation" />
  </>;
}
