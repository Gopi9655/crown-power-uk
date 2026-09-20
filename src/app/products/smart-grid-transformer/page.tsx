import { PageHero } from "@/components/ui/PageHero";
import {
  Section,
  SectionHeading,
  Button,
  Cards,
  CTASection,
  ReviewNote,
} from "@/components/ui/Sections";
import { ImageGallery } from "@/components/ui/ImageGallery";
import content from "@/data/content/GridTransformer.json";
import { pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "Smart Grid Transformers",
  "Intelligent distribution and monitoring, engineered and integrated around your network requirements. View the supplied transformer gallery.",
  "/products/smart-grid-transformer",
);
export default function TransformerPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Distribution"
        title="Smart Grid Transformers"
        description="Intelligent distribution engineered for efficient, reliable and future-ready power networks."
        image="/images/home/advanced-power-engineering.jpg"
      >
        <Button href="/contact#enquiry">Technical Enquiry →</Button>
        <Button secondary href="#gallery">
          View Product Gallery
        </Button>
      </PageHero>
      <Section>
        <div className="split split-top">
          <div>
            <p className="eyebrow">Technology Overview</p>
            <h2>The intelligent backbone of modern distribution.</h2>
          </div>
          <div>
            <p>
              Transformers sit at the heart of every power network — stepping
              voltage up and down so energy can travel efficiently from source
              to load. Crown Power&apos;s smart grid transformers pair proven
              engineering with monitoring capability, supporting more visible,
              controllable and resilient distribution.
            </p>
            <p>
              Each unit is specified and integrated as part of a complete power
              system — engineered to project requirements and supported through
              installation and beyond.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="Engineering Applications"
          title="Where our transformers deliver."
        />
        <Cards items={content.applications} />
      </Section>
      <Section id="gallery">
        <SectionHeading
          eyebrow="Product Gallery"
          title="Our new grid transformer range."
          text="Supplied transformer imagery. Select an image to view it larger."
        />
        <ImageGallery />
        <ReviewNote title="Technical specifications — company confirmation required">
          <p>
            Ratings, voltages, efficiency, warranties, certifications and final
            configurations must be confirmed by Crown Power. Please discuss your
            distribution requirements with our engineers.
          </p>
        </ReviewNote>
      </Section>
      <CTASection
        title="Specify a transformer for your network."
        text="Share your distribution requirements and our engineers will advise on the right configuration."
        label="Make a Technical Enquiry →"
      />
    </>
  );
}
