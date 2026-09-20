import type { Metadata } from "next";
import menus from "./content/Header.json";
import serviceContent from "./content/Services.json";

export const siteUrl = "https://www.crownpoweruk.co.uk";
export const company = {
  name: "Crown Power Energy Systems Ltd",
  email: "info@crownpoweruk.co.uk",
  directorEmail: "arefm@crownpoweruk.co.uk",
  phone: "+44 7492 046104",
  companyNumber: "16070400",
  vatNumber: "480 0284 11",
  registeredOffice:
    "Companies House, Crown Way, Cardiff, CF14 3UZ, DX 33050 Cardiff",
  legalEmail: "attorneys@crownpoweruk-legals.co.uk",
};
export const navigation = Object.values(menus);
export const services = serviceContent.categories;
export const liveData = serviceContent.liveData;
export const sectors = serviceContent.sectors.map((sector) =>
  sector.title === "Agricultural"
    ? {
        ...sector,
        items: [
          "Farms",
          "Livestock Facilities",
          "Greenhouses",
          "Agricultural Processing",
          "Storage Silos",
          "Dairy",
          "Irrigation",
          "Cold Storage",
          "Feed Mills",
          "R&D",
          "Aquaculture",
        ],
      }
    : sector,
);
export const offices = [
  {
    country: "United Kingdom",
    city: "West Midlands",
    detail: "Head Office — England, UK.",
    email: company.email,
    phone: company.phone,
    tel: "+447492046104",
    website: "https://www.crownpoweruk.co.uk",
  },
  {
    country: "Portugal",
    city: "Lisbon",
    detail: "European branch — Lisbon, Portugal.",
    email: "aref.mashali@crownpower.pt",
    phone: "+351 910 163 080",
    tel: "+351910163080",
    website: "https://crownpoweruk.pt",
  },
  {
    country: "United Arab Emirates",
    city: "Dubai",
    detail: "Arab Bank Bldg, Port Saeed, Dubai, UAE.",
    email: "",
    phone: "+971 052 689 7096",
    tel: "+971526897096",
    website: "https://crownpoweruk.com",
  },
];
export const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/aref-mashali-86a877258/",
  },
  { label: "X", href: "https://twitter.com/ArefMashaliUK" },
  { label: "Instagram", href: "https://instagram.com/arefmashaliuk" },
  { label: "Facebook", href: "https://m.facebook.com/aref.mashali.5" },
  { label: "TikTok", href: "https://www.tiktok.com/@crown_power_energy_systm" },
];
export const policyLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Cookie Policy", href: "/cookies" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
  { label: "Health & Safety", href: "/health-safety" },
  { label: "Legal Department", href: "/legal" },
];
export const routes = [
  "/",
  "/services",
  "/why-green-energy",
  "/products/bess",
  "/products/smart-grid-transformer",
  "/products/battery-products",
  "/about",
  "/team",
  "/partners",
  "/internships",
  "/training",
  "/application",
  "/announcements",
  "/contact",
  ...policyLinks.map((p) => p.href),
];
export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      images: ["/images/home/renewable-energy-hero.jpg"],
    },
  };
}
