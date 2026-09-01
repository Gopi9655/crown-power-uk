import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ui/ContentPage";
import { CTASection } from "@/components/ui/CTASection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { announcements, contentPageMap, contentPages } from "@/data/site";

const aliases: Record<string,string>={"health-safety":"health-and-safety","why-green-energy":"why-go-solar"};
export function generateStaticParams(){return [...contentPages.map((page)=>({slug:page.slug})),{slug:"statements-announcements"},{slug:"health-safety"},{slug:"why-green-energy"}]}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;if(slug==="statements-announcements")return{title:"Statements & Announcements",description:"Official Crown Power statements and company announcements.",alternates:{canonical:"/statements-announcements"}};const page=contentPageMap[aliases[slug]??slug];if(!page)return{};return{title:page.title,description:page.intro,alternates:{canonical:`/${page.slug}`}}}
export default async function PublicContentPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;if(slug==="statements-announcements")return <><PageHero eyebrow="Insights · Company Updates" title="Statements & announcements." intro="Official updates on Crown Power operations, initiatives and developments in energy and engineering."/><section className="section section--offwhite"><Container><div className="announcement-grid">{announcements.map((item)=><article key={item.title} className="announcement-card"><div className="announcement-card__meta"><span>{item.category}</span><time>{item.date}</time></div><h2>{item.title}</h2><p>{item.summary}</p></article>)}</div></Container></section><CTASection title="Need further information?" text="Contact Crown Power for enquiries relating to a published statement."/></>;const page=contentPageMap[aliases[slug]??slug];if(!page)notFound();return <ContentPage page={page}/>}
