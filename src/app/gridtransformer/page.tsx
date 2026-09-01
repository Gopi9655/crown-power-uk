import type { Metadata } from "next";
import { ImageGallery } from "@/components/ui/ImageGallery";
import { CTASection } from "@/components/ui/CTASection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Smart Grid Transformers", description: "Smart grid transformers for efficient, reliable and future-ready distribution networks.", alternates: { canonical: "/gridtransformer" } };

const applications = [["Grid Infrastructure","Core distribution assets engineered for reliable operation."],["Power Distribution","Stepping voltage across networks with minimal losses."],["Substation Integration","Specified and installed as part of substation builds."],["Network Upgrades","Reinforcing capacity for growing and changing demand."],["Monitoring & Control","Visibility that supports smarter, more responsive grids."],["Renewable Connection","Linking solar, wind and storage into the wider network."]];

export default function GridTransformerPage() {
  return <>
    <PageHero eyebrow="Products · Distribution" title="Smart Grid Transformers" intro="Intelligent distribution engineered for efficient, reliable and future-ready power networks." image="/images/home/advanced-power-engineering.jpg" primary={{label:"Technical Enquiry",href:"/contact#enquiry"}} secondary={{label:"View Product Gallery",href:"#gallery"}} />
    <section className="section"><Container className="intro-grid"><div><p className="eyebrow">Technology Overview</p><h2>The intelligent backbone of modern distribution.</h2></div><div className="intro-grid__copy"><p>Transformers sit at the heart of every power network — stepping voltage up and down so energy can travel efficiently from source to load. Crown Power&apos;s smart grid transformers pair proven engineering with monitoring capability, supporting more visible, controllable and resilient distribution.</p><p>Each unit is specified and integrated as part of a complete power system — engineered to project requirements and supported through installation and beyond.</p></div></Container></section>
    <section className="section section--offwhite"><Container><SectionHeading eyebrow="Engineering Applications" title="Where our transformers deliver." /><div className="benefit-grid">{applications.map(([title,text]) => <article key={title} className="application-card"><h3>{title}</h3><p>{text}</p></article>)}</div></Container></section>
    <section id="gallery" className="section section--midnight"><Container><SectionHeading eyebrow="Product Gallery" title="Our new grid transformer range." text="Select an image to view it larger. Use the arrow keys to move through the gallery." light /><ImageGallery /></Container></section>
    <CTASection title="Specify a transformer for your network." text="Share your distribution requirements and our engineers will advise on the right configuration." label="Make a technical enquiry" />
  </>;
}
