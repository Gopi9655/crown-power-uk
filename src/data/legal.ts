import legal from "./content/Legal.json";
import health from "./content/HealthSafety.json";
import privacy from "./content/PrivacyPolicy.json";
import cookies from "./content/CookiePolicy.json";
import terms from "./content/TermsConditions.json";
import accessibility from "./content/Accessibility.json";
export type LegalContent = {
  title: string;
  summary: string;
  eyebrow: string;
  updated: string;
  reviewNote: string;
  contactHeading: string;
  contactNote: string;
  contactEmail: string;
  sections: { id: string; h: string; paras: string[]; list?: string[] }[];
  related: { label: string; href: string }[];
};
export const legalPages: Record<string, LegalContent> = {
  legal,
  "health-safety": health,
  privacy,
  cookies,
  terms,
  accessibility,
};
