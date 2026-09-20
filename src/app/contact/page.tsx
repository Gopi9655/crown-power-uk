import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Sections";
import { ContactForm } from "@/components/contact/ContactForm";
import { company, offices, socialLinks, pageMetadata } from "@/data/site";
export const metadata = pageMetadata(
  "Contact Crown Power",
  "Contact Crown Power in the UK, Lisbon and Dubai for engineering, product, partnership or careers enquiries.",
  "/contact",
);
export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Talk to Crown Power."
        description="Tell us about your project or enquiry — our engineers will get back to you."
      />
      <Section id="enquiry">
        <div className="contact-grid">
          <div>
            <h2>Get in touch</h2>
            <a className="contact-channel" href={`mailto:${company.email}`}>
              <small>Email</small>
              <strong>{company.email}</strong>
            </a>
            <a className="contact-channel" href="tel:+447492046104">
              <small>Phone</small>
              <strong>{company.phone}</strong>
            </a>
            <a className="contact-channel" href="https://wa.me/447492046104">
              <small>WhatsApp</small>
              <strong>{company.phone} ↗</strong>
            </a>
            <div className="contact-offices">
              <h3>International offices</h3>
              {offices.map((o) => (
                <div className="contact-office" key={o.city}>
                  <h3>{o.country}</h3>
                  <p>
                    {o.city} — {o.detail}
                  </p>
                  {o.email && <a href={`mailto:${o.email}`}>{o.email}</a>}
                  <a href={`tel:${o.tel}`}>{o.phone}</a>
                  <a href={o.website}>{new URL(o.website).hostname} ↗</a>
                  <a href={`https://wa.me/${o.tel.slice(1)}`}>WhatsApp ↗</a>
                </div>
              ))}
            </div>
            <div className="social-links">
              {socialLinks.map((s) => (
                <a key={s.label} href={s.href}>
                  {s.label} ↗
                </a>
              ))}
            </div>
            <p className="form-note">WeChat: Crown_Power_Energy</p>
            <div className="contact-office">
              <h3>Direct &amp; legal correspondence</h3>
              <a href={`mailto:${company.directorEmail}`}>
                {company.directorEmail}
              </a>
              <a href={`mailto:${company.legalEmail}`}>{company.legalEmail}</a>
            </div>
          </div>
          <ContactForm
            deliveryEnabled={Boolean(
              process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL,
            )}
          />
        </div>
      </Section>
    </>
  );
}
