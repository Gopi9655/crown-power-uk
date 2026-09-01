import type { Metadata, Viewport } from "next";
import { Inter, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { company, siteUrl } from "@/data/site";
import "./globals.css";

const manrope=Manrope({subsets:["latin"],variable:"--font-manrope",display:"swap"});
const inter=Inter({subsets:["latin"],variable:"--font-inter",display:"swap"});
export const metadata:Metadata={metadataBase:new URL(siteUrl),title:{default:"Crown Power Energy Systems Ltd",template:"%s | Crown Power Energy Systems"},description:"Powering sustainable, smart and reliable energy solutions through electrical power engineering.",applicationName:"Crown Power Energy Systems",alternates:{canonical:"/"},openGraph:{type:"website",locale:"en_GB",siteName:"Crown Power Energy Systems",title:"Crown Power Energy Systems Ltd",description:"Electrical power engineering for renewable, smart and industrial energy systems.",url:siteUrl,images:[{url:"/images/brand/crown-power-app-icon.png",width:1024,height:1024,alt:"Crown Power Energy Systems"}]},twitter:{card:"summary_large_image",title:"Crown Power Energy Systems Ltd",description:"Powering sustainable, smart and reliable energy systems.",images:["/images/brand/crown-power-app-icon.png"]},icons:{icon:"/images/brand/crown-power-app-icon.png",apple:"/images/brand/crown-power-app-icon.png"}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#07111F",colorScheme:"light"};
const organization={"@context":"https://schema.org","@type":"Organization",name:company.name,url:siteUrl,email:company.email,telephone:company.phone,description:"Electrical power engineering company for renewable integration, smart energy technologies and industrial power systems.",address:{"@type":"PostalAddress",addressLocality:"West Midlands",addressCountry:"GB"},sameAs:["https://www.linkedin.com/in/aref-mashali-86a877258/","https://instagram.com/arefmashaliuk","https://m.facebook.com/aref.mashali.5"]};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en" className={`${manrope.variable} ${inter.variable}`}><body><a className="skip-link" href="#main-content">Skip to main content</a><Header/><main id="main-content" className="site-main">{children}</main><Footer/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organization).replace(/</g,"\\u003c")}}/></body></html>}
