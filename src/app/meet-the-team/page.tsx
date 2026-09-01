import type { Metadata } from "next";
import { TeamDirectory } from "@/components/team/TeamDirectory";
import { CTASection } from "@/components/ui/CTASection";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";

export const metadata: Metadata = { title: "Meet the Team", description: "Meet the multidisciplinary Crown Power Energy Systems team.", alternates: { canonical: "/meet-the-team" } };

export default function MeetTheTeamPage() {
  return <><PageHero eyebrow="Company · People" title="Meet the team." intro="A multidisciplinary team of engineers, technologists and specialists combining industry knowledge with innovative approaches to sustainable energy." /><section className="section" id="team-directory"><Container><TeamDirectory /></Container></section><CTASection title="Join our team." text="We're interested in people driven to shape the future of energy." label="Apply today" href="/application" secondary={{label:"Internships",href:"/internships"}} /></>;
}
