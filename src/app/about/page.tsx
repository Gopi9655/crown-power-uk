import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { offices } from "@/data/site";

export const metadata: Metadata = { title: "About", description: "About Crown Power Energy Systems Ltd, our engineering approach and international presence.", alternates: { canonical: "/about" } };

const pillars = [
  ["01", "Quality & Innovation", "A commitment to engineering quality and modern, future-ready technology."],
  ["02", "Reliable & Durable", "Solutions designed for dependable operation and long-term performance."],
  ["03", "Tailored Solutions", "Every requirement is unique — we engineer for the needs of each engagement."],
  ["04", "End-to-End Delivery", "Design, engineering, installation, integration and ongoing maintenance."],
];

const companyInfo = [["Company Director","Mr Aref Mashali"],["Company Number","16070400"],["VAT Registration","480 0284 11"],["Registered Office","Crown Way, Cardiff, CF14 3UZ"],["Jurisdiction","England & Wales"],["Head Office","West Midlands, UK"]];

export default function AboutPage() {
  return <>
    <PageHero eyebrow="About Crown Power" title="Engineering reliability into every system." intro="An electrical power engineering company focused on sustainable energy solutions for the UK energy industry — and beyond." image="/images/company/about-hero.jpg" />
    <section className="section"><Container className="split-grid"><div className="split-copy"><p className="eyebrow">Who We Are</p><h2>A power engineering partner for the energy transition.</h2><p>Crown Power Energy Systems Ltd specialises in renewable energy integration, smart-energy technologies and industrial-grade power systems.</p><p>Our end-to-end approach — from engineering and design to installation, integration and maintenance — is built to improve efficiency, enhance reliability and support long-term operational performance.</p></div><div className="split-image"><Image src="/images/company/about-engineering.jpg" alt="Sustainable energy engineering" width={1200} height={900} /></div></Container></section>
    <section className="section section--offwhite"><Container><SectionHeading eyebrow="Our Approach" title="Principles that guide every engagement." /><div className="sector-grid">{pillars.map(([n,title,text]) => <article key={n} className="benefit-card"><span className="capability-card__number">{n}</span><h3 style={{marginTop:14}}>{title}</h3><p>{text}</p></article>)}</div></Container></section>
    <section className="section section--midnight"><Container><div className="process-grid mvv-grid" style={{background:"rgba(255,255,255,.08)",borderColor:"rgba(255,255,255,.08)"}}>{[["Mission","To deliver sustainable, smart and reliable energy systems that improve efficiency and support long-term performance."],["Vision","A cleaner, more resilient energy future powered by well-engineered renewable and smart infrastructure."],["Values","Excellence through innovation, power through reliability — and responsibility to a more sustainable world."]].map(([label,text]) => <article key={label} className="process-card" style={{background:"#07111f"}}><span>{label.toUpperCase()}</span><p style={{color:"#eaf0f6",fontFamily:"var(--font-display)",fontSize:20,fontWeight:650}}>{text}</p></article>)}</div></Container></section>
    <section className="transition-section"><Image src="/images/company/uk-sustainability.jpg" alt="UK energy and sustainability" fill sizes="100vw" className="transition-section__image" /><div className="transition-section__scrim" /><Container><div className="transition-section__content"><p className="eyebrow">Sustainability</p><h2>Aligned with the ambition for clean, affordable power.</h2><p>We support the UK&apos;s transition towards clean power through renewable integration, storage and intelligent energy management, without compromising reliability.</p></div></Container></section>
    <section className="section"><Container><SectionHeading eyebrow="International Presence" title="UK-headquartered, with branches in Europe and the Gulf." /><div className="office-grid">{offices.map((office) => <article className="office-card" key={office.city}><span>{office.country}</span><h3>{office.city}</h3><p>{office.detail}</p></article>)}</div></Container></section>
    <section className="section section--offwhite"><Container className="split-grid"><div><SectionHeading eyebrow="Company Information" title="Crown Power Energy Systems Ltd" /><div>{companyInfo.map(([key,value]) => <div key={key} style={{display:"flex",justifyContent:"space-between",gap:20,padding:"13px 0",borderBottom:"1px solid var(--border)",fontSize:14}}><span style={{color:"#8a98a6"}}>{key}</span><strong style={{textAlign:"right"}}>{value}</strong></div>)}</div></div><div style={{display:"grid",gap:16}}><Link href="/meet-the-team" className="benefit-card" style={{background:"#0b1f33",color:"#fff"}}><h3>Leadership &amp; Team</h3><p style={{color:"#b9c6d3"}}>Meet the people engineering Crown Power&apos;s solutions.</p><span style={{color:"#e1c278",fontWeight:700}}>Meet the team →</span></Link><Link href="/internships" className="benefit-card"><h3>Careers &amp; Internships</h3><p>Join a company shaping the future of energy.</p><span style={{color:"#176bff",fontWeight:700}}>Explore opportunities →</span></Link><div className="benefit-card" style={{display:"flex",alignItems:"center",gap:20}}><Image src="/images/company/iso-9001-badge.jpg" alt="ISO 9001 certification badge shown by Crown Power" width={90} height={90} /><p>ISO 9001 certification badge displayed in Crown Power&apos;s public company material.</p></div></div></Container></section>
    <CTASection title="Work with Crown Power." text="Whether you're planning a project or exploring partnership, we'd like to hear from you." />
  </>;
}
