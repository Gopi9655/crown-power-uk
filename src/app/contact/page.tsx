import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { company, offices } from "@/data/site";

export const metadata: Metadata={title:"Contact",description:"Contact Crown Power Energy Systems about engineering, energy, products, partnerships or careers.",alternates:{canonical:"/contact"}};
const contacts=[[Mail,"Email",company.email,`mailto:${company.email}`],[Phone,"Phone",company.phone,`tel:${company.phoneHref}`],[MessageCircle,"WhatsApp",company.phone,"https://wa.me/447492046104"],[MapPin,"Head Office",company.headOffice,"/contact#enquiry"]] as const;

export default function ContactPage(){return <><PageHero eyebrow="Contact" title="Talk to Crown Power." intro="Tell us about your project or enquiry — our engineers will get back to you."/><section id="enquiry" className="section"><Container className="contact-grid"><div className="contact-info"><h2>Get in touch</h2>{contacts.map(([Icon,label,value,href])=><a key={label} href={href} className="contact-link"><span className="contact-link__icon"><Icon size={18}/></span><span><small>{label}</small><strong>{value}</strong></span></a>)}<div className="contact-offices"><h3>International offices</h3>{offices.map((office)=><article className="contact-office" key={office.city}><span>{office.country}</span><p>{office.city} — {office.detail} {office.contact}</p></article>)}</div></div><ContactForm/></Container></section></>}
