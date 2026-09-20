import { PageHero } from "@/components/ui/PageHero";
import {
  Section,
  SectionHeading,
  Cards,
  CTASection,
  ReviewNote,
} from "@/components/ui/Sections";
import content from "@/data/content/BatteryProducts.json";
import { pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "Battery Products",
  "Alkaline, NiMH and lithium-ion chemistries, common battery sizes, rechargeable options and responsible recycling.",
  "/products/battery-products",
);
export default function BatteryProductsPage() {
  return (
    <>
      <PageHero
        eyebrow="Products · Battery Products"
        title="The right battery for every application."
        description="From everyday cells to rechargeable technologies, we help you choose the correct battery type, size and chemistry for the job — and dispose of them responsibly."
      />
      <Section>
        <SectionHeading
          eyebrow="Battery Chemistries"
          title="Understanding the main types."
          text="Each chemistry suits different uses. The right choice depends on the device, how often it is used and whether it is rechargeable."
        />
        <div className="card-grid">
          {content.chemistries.map((c) => (
            <article className="card" key={c.type}>
              <span className="index">{c.type}</span>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
              <hr className="my-6 border-slate-200" />
              <strong className="text-sm">Typically used for</strong>
              <p>{c.uses}</p>
            </article>
          ))}
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="Common Sizes"
          title="Standard cell sizes, explained."
        />
        <table className="data-table">
          <caption className="sr-only">
            Common battery formats and typical applications
          </caption>
          <thead>
            <tr>
              <th scope="col">Size</th>
              <th scope="col">Typical applications</th>
            </tr>
          </thead>
          <tbody>
            {content.sizes.map((s) => (
              <tr key={s.size}>
                <td>{s.size}</td>
                <td>{s.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Section>
      <Section>
        <div className="split split-top">
          <div>
            <h2>Standard &amp; disposable</h2>
            <p>
              Single-use cells such as alkaline batteries are convenient and
              hold charge well in storage, making them well suited to low-drain
              and infrequently used devices.
            </p>
            <p>
              They are cost-effective up front, but should always be recycled
              rather than sent to general waste.
            </p>
          </div>
          <div>
            <h2>Rechargeable</h2>
            <p>
              Rechargeable chemistries such as NiMH and lithium-ion can be
              reused many times, which may reduce cost and waste for frequently
              used, higher-drain devices.
            </p>
            <p>
              They require a suitable charger and correct handling, and must be
              recycled at end of life.
            </p>
          </div>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="Disposal & Recycling"
          title="Dispose of batteries responsibly."
          text="Batteries contain materials that should be kept out of general waste. Recycling recovers valuable materials and prevents environmental harm."
        />
        <Cards items={content.recycle} />
      </Section>
      <Section>
        <ReviewNote title="Product catalogue — company data required">
          <p>
            Specific product ranges, capacities, brands, pack sizes, pricing and
            availability will be published here once confirmed by Crown Power.
            We do not list capacities or specifications that have not been
            verified.
          </p>
        </ReviewNote>
      </Section>
      <CTASection
        title="Need help choosing?"
        text="Tell us about your devices and usage, and we'll advise on the right batteries — or a storage system for larger needs."
        label="Ask an Engineer →"
        secondary={{ label: "Explore Battery Storage", href: "/products/bess" }}
      />
    </>
  );
}
