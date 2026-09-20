import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Sections";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "Apply to Crown Power",
  "Apply for internships, work experience, training and early-career opportunities at Crown Power.",
  "/application",
);
export default function ApplicationPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact · Application"
        title="Apply to Crown Power."
        description="One form for internships, training and general applications. Tell us who you are and what you're interested in."
      />
      <Section tone="surface">
        <div className="application-grid">
          <ContactForm
            type="application"
            deliveryEnabled={Boolean(
              process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL,
            )}
          />
          <aside className="stack">
            <div className="card">
              <h2>Before you apply</h2>
              <Link href="/internships">
                Read about our internship programme →
              </Link>
              <Link href="/training">Explore training &amp; development →</Link>
              <Link href="/about">Learn about Crown Power →</Link>
            </div>
            <div className="card">
              <h2>Questions?</h2>
              <p>Prefer to ask before applying? Reach our team directly.</p>
              <a className="break-words" href="mailto:info@crownpoweruk.co.uk">
                info@crownpoweruk.co.uk
              </a>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
