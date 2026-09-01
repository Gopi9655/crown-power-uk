import type { Metadata } from "next";
import Image from "next/image";
import { BatteryCharging, Blocks, Building2, ChartNoAxesCombined, ShieldCheck, SunMedium } from "lucide-react";
import { CTASection } from "@/components/ui/CTASection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Battery Energy Storage Systems", description: "Battery energy storage engineered for resilient, efficient and intelligent energy networks.", alternates: { canonical: "/bess" } };

const benefits = [
  [BatteryCharging,"Energy Storage","Capture surplus generation and hold it until it is needed most."],
  [ChartNoAxesCombined,"Peak Management","Manage demand peaks and reduce exposure to high-tariff periods."],
  [SunMedium,"Renewable Integration","Smooth the variability of solar and wind for steadier supply."],
  [ShieldCheck,"Grid Resilience","Backup and stabilisation to support critical operations."],
  [Building2,"Commercial & Industrial","Behind-the-meter storage for facilities, sites and estates."],
  [Blocks,"Scalable Architecture","Modular capacity designed around project requirements."],
];

export default function BessPage() {
  return <>
    <PageHero eyebrow="Products · Energy Storage" title="Battery Energy Storage Systems" intro="Flexible infrastructure for resilient, efficient and intelligent energy networks." image="/images/bess/battery-energy-storage.jpg" primary={{label:"Enquire about BESS",href:"/contact#enquiry"}} secondary={{label:"Related solutions",href:"/services#renewable"}} />
    <section className="section"><Container className="intro-grid"><div><p className="eyebrow">Technology Overview</p><h2>Storing energy where and when it delivers the most value.</h2></div><div className="intro-grid__copy"><p>Battery energy storage lets organisations capture surplus generation and discharge it when demand, price or grid conditions call for it. Integrated with renewable sources and smart controls, BESS improves efficiency, strengthens resilience and supports a cleaner, more flexible network.</p><p>Crown Power engineers storage as part of a complete power system — from assessment and design through installation, integration and long-term support.</p></div></Container></section>
    <section className="section section--offwhite"><Container><SectionHeading eyebrow="System Benefits" title="What energy storage delivers." /><div className="benefit-grid">{benefits.map(([Icon,title,text]) => {const IconComponent=Icon as typeof BatteryCharging;return <article key={title as string} className="benefit-card"><div className="benefit-card__icon"><IconComponent size={24} strokeWidth={1.7} /></div><h3>{title as string}</h3><p>{text as string}</p></article>})}</div></Container></section>
    <section className="section section--navy"><Container className="dark-split"><div><p className="eyebrow" style={{color:"#8fd0ff"}}>Applications</p><h2>Engineered for commercial, industrial and infrastructure use.</h2><div className="tag-list">{["Renewable firming","Backup power","Load shifting","Peak shaving","Frequency response","Microgrids","EV charging support","Grid services"].map((item)=><span key={item}>{item}</span>)}</div></div><Image src="/images/services/smart-energy-technologies.jpg" alt="Battery storage integrated with clean-energy infrastructure" width={1100} height={820} /></Container></section>
    <section className="section"><Container><div className="configuration-note"><span>Configuration</span><p>System configurations are scoped by our engineers to match project capacity, site and performance requirements.</p></div></Container></section>
    <CTASection title="Discuss a storage project." text="Our engineers will assess your requirements and recommend a configuration built around them." label="Request a consultation" />
  </>;
}
