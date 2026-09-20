import { notFound } from "next/navigation";
import { legalPages } from "@/data/legal";
import { pageMetadata } from "@/data/site";
import { LegalLayout } from "@/components/pages/LegalLayout";
import {
  InternshipsPage,
  PartnersPage,
  TrainingPage,
  WhyGreenEnergyPage,
} from "@/components/pages/EditorialPages";
const editorial = {
  partners: {
    title: "Partners & Contractors",
    description:
      "Technology, supply and delivery opportunities with Crown Power.",
    component: PartnersPage,
  },
  internships: {
    title: "Internships & Work Experience",
    description:
      "Early-career placements across engineering, energy, business, finance, safety and technology.",
    component: InternshipsPage,
  },
  training: {
    title: "Training & Development",
    description:
      "Technical, safety and professional development at Crown Power.",
    component: TrainingPage,
  },
  "why-green-energy": {
    title: "Why Green Energy",
    description:
      "Assess renewable generation, storage and smart control around your site and objectives.",
    component: WhyGreenEnergyPage,
  },
};
export function generateStaticParams() {
  return [...Object.keys(legalPages), ...Object.keys(editorial)].map(
    (slug) => ({ slug }),
  );
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const legal = legalPages[slug];
  const page = editorial[slug as keyof typeof editorial];
  if (legal) return pageMetadata(legal.title, legal.summary, `/${slug}`);
  if (page) return pageMetadata(page.title, page.description, `/${slug}`);
  return {};
}
export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (legalPages[slug]) return <LegalLayout page={legalPages[slug]} />;
  const page = editorial[slug as keyof typeof editorial];
  if (!page) notFound();
  const Component = page.component;
  return <Component />;
}
