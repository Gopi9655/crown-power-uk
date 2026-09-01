import type { MetadataRoute } from "next";
import { contentPages, siteUrl } from "@/data/site";
export default function sitemap():MetadataRoute.Sitemap{const paths=["","/about","/services","/bess","/gridtransformer","/meet-the-team","/contact","/statements-announcements",...contentPages.map((page)=>`/${page.slug}`)];return paths.map((path)=>({url:`${siteUrl}${path}`,lastModified:new Date("2026-09-01"),changeFrequency:path===""?"monthly":"yearly",priority:path===""?1:path==="/services"?0.9:0.7}))}
