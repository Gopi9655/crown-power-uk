import { PageHero } from "@/components/ui/PageHero";
import { Section, CTASection } from "@/components/ui/Sections";
import { TeamDirectory } from "@/components/team/TeamDirectory";
import { pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "Meet the Team",
  "Meet the supplied Crown Power roster across engineering, technology, business, sustainability, leadership and legal.",
  "/team",
);
export default function TeamPage() {
  return (
    <>
      <PageHero
        eyebrow="Company · People"
        title="Meet the team."
        description="A multidisciplinary team of engineers, technologists and specialists — combining industry experience with innovative approaches to deliver sustainable energy solutions."
      />
      <Section>
        <TeamDirectory />
      </Section>
      <CTASection
        title="Join our team."
        text="Explore opportunities to shape the future of energy."
        label="Apply Today →"
        href="/application"
        secondary={{ label: "Internships", href: "/internships" }}
      />
    </>
  );
}
