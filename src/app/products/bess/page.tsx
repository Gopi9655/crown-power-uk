import { PageHero } from "@/components/ui/PageHero";
import {
  Section,
  SectionHeading,
  Button,
  Cards,
  Photo,
  CTASection,
  ReviewNote,
} from "@/components/ui/Sections";
import content from "@/data/content/BESS.json";
import { pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "Battery Energy Storage Systems",
  "BESS engineering for renewable integration, peak management, load shifting, backup power and flexible energy networks.",
  "/products/bess",
);
export default function BESSPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Energy Storage"
        title="Battery Energy Storage Systems"
        description="Flexible infrastructure for resilient, efficient and intelligent energy networks."
        image="/images/bess/battery-energy-storage.jpg"
      >
        <Button href="/contact#enquiry">Enquire About BESS →</Button>
        <Button secondary href="/services#renewable">
          Related Solutions
        </Button>
      </PageHero>
      <Section>
        <div className="split split-top">
          <div>
            <p className="eyebrow">Technology Overview</p>
            <h2>Storing energy where and when it delivers the most value.</h2>
          </div>
          <div>
            <p>
              Battery energy storage lets organisations capture surplus
              generation and discharge it precisely when demand, price or grid
              conditions call for it. Integrated with renewable sources and
              smart controls, BESS can improve efficiency, strengthen resilience
              and support a cleaner, more flexible network.
            </p>
            <p>
              Crown Power engineers storage as part of a complete power system —
              from assessment and design through installation, integration and
              long-term support.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading title="What energy storage delivers." />
        <Cards items={content.benefits} />
      </Section>
      <Section>
        <div className="split">
          <div>
            <p className="eyebrow">Applications</p>
            <h2>
              Engineered for commercial, industrial and infrastructure use.
            </h2>
            <div className="tags">
              {content.applications.map((a) => (
                <span key={a}>{a}</span>
              ))}
            </div>
          </div>
          <div>
            <Photo
              src="/images/services/smart-energy-technologies.jpg"
              alt="Illustrative renewable energy infrastructure"
            />
            <p className="image-caption">Representational energy imagery.</p>
          </div>
        </div>
        <ReviewNote title="Configuration — technical confirmation required">
          <p>
            System configurations are scoped by our engineers to match your
            capacity, site and performance needs. Ratings, voltages, efficiency,
            warranties and certifications require Crown Power confirmation; no
            unverified specifications are published.
          </p>
        </ReviewNote>
      </Section>
      <CTASection
        title="Discuss a storage project."
        text="Our engineers will assess your requirements and recommend a configuration built around them."
        label="Request a Consultation →"
      />
    </>
  );
}
