import Link from "next/link";
import { PageHero } from "../ui/PageHero";
import {
  Section,
  SectionHeading,
  Cards,
  Checklist,
  Process,
  CTASection,
  ReviewNote,
  Button,
} from "../ui/Sections";
import partners from "@/data/content/Partners.json";
import internships from "@/data/content/Internships.json";
import training from "@/data/content/Training.json";
import green from "@/data/content/WhyGreenEnergy.json";

export function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Company · Partners & Contractors"
        title="Build the energy future with us."
        description="Crown Power works with partners, suppliers and contractors who share our commitment to quality engineering and reliable delivery."
        image="/images/services/power-systems.jpg"
      />
      <Section>
        <SectionHeading
          eyebrow="Why Crown Power"
          title="A partner focused on doing things properly."
        />
        <Cards items={partners.why} />
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="Ways to Engage"
          title="Two routes to working together."
        />
        <div className="split split-top">
          <article className="card">
            <span className="index">Business Partners</span>
            <h3>Technology &amp; supply partnerships</h3>
            <p>
              We collaborate with technology providers, suppliers and specialist
              firms whose products and expertise complement our engineering. If
              your organisation would add value to our projects, we&apos;d like
              to talk.
            </p>
            <Checklist items={partners.partnerPoints} />
          </article>
          <article className="card">
            <span className="index">Contractors</span>
            <h3>Delivery &amp; installation contractors</h3>
            <p>
              We engage qualified contractors to support installation and
              delivery. Applicants should be able to demonstrate relevant
              competence, safe working practices and appropriate accreditation.
            </p>
            <Checklist items={partners.contractorPoints} />
          </article>
        </div>
      </Section>
      <Section>
        <SectionHeading
          eyebrow="How It Works"
          title="Expressing interest is straightforward."
        />
        <Process items={partners.steps} />
      </Section>
      <CTASection
        title="Interested in working with Crown Power?"
        text="Send us a short introduction to your organisation and how you'd like to collaborate."
        label="Register Your Interest →"
      />
    </>
  );
}
export function InternshipsPage() {
  return (
    <>
      <PageHero
        eyebrow="Company · Internships & Work Experience"
        title="Start your career in energy."
        description="Crown Power offers internship and work-experience placements for students and early-career candidates who want exposure to a real power-engineering business."
        image="/images/bess/battery-products.jpg"
      >
        <Button href="/application">Apply for a Placement →</Button>
      </PageHero>
      <Section>
        <div className="split split-top">
          <h2 className="lead">
            A chance to learn how energy projects come together — across
            engineering, business and operations.
          </h2>
          <p>
            Our placements are designed to give participants practical insight
            into how a modern energy-engineering company works. The exact scope
            of a placement depends on availability, the participant&apos;s
            background and business needs, and is confirmed on an individual
            basis.
          </p>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="Areas of Exposure"
          title="Where you might spend time."
        />
        <Cards items={internships.areas} />
      </Section>
      <Section>
        <div className="split split-top">
          <div>
            <p className="eyebrow">Who It&apos;s For</p>
            <h2>Students &amp; early-career talent.</h2>
            <Checklist items={internships.audience} />
          </div>
          <div>
            <p className="eyebrow">What You May Gain</p>
            <h2>Real experience, real context.</h2>
            <Checklist items={internships.gains} />
          </div>
        </div>
        <ReviewNote title="Placement terms">
          <p>
            Placement terms — including duration, whether a placement is paid or
            voluntary, and the areas of work involved — are confirmed
            individually and depend on availability. We make no guarantee of
            future employment, and access to any operational systems is subject
            to appropriate supervision and safety requirements.
          </p>
        </ReviewNote>
      </Section>
      <CTASection
        title="Ready to apply?"
        text="Tell us about yourself and the kind of placement you're looking for."
        label="Start an Application →"
        href="/application"
        secondary={{ label: "View Training", href: "/training" }}
      />
    </>
  );
}
export function TrainingPage() {
  return (
    <>
      <PageHero
        eyebrow="Company · Training & Development"
        title="Developing skilled, safety-first engineers."
        description="We invest in the development of our people and placement participants — building technical capability on a foundation of safe working practice."
        image="/images/services/specialised-services.jpg"
      />
      <Section>
        <div className="split split-top">
          <h2 className="lead">
            Good engineering depends on good people — and good people keep
            learning.
          </h2>
          <p>
            Our approach to training combines on-the-job learning with
            structured development across technical, safety and professional
            skills. Programme content is tailored to the individual and the
            needs of the business, and is confirmed on a case-by-case basis.
          </p>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="Development Focus"
          title="What development can cover."
        />
        <Cards items={training.focus} columns={4} />
      </Section>
      <Section tone="dark">
        <div className="split">
          <div>
            <p className="eyebrow">Safety First</p>
            <h2>Every programme starts with safety.</h2>
            <p>
              Working with electrical power carries real risk. Health &amp;
              safety awareness and safe working practice run through everything
              we do — for our own team and for anyone we train.
            </p>
          </div>
          <div>
            <h3>Our Health &amp; Safety commitment</h3>
            <p>Read how safety underpins our work.</p>
            <Button secondary href="/health-safety">
              Our commitment →
            </Button>
          </div>
        </div>
      </Section>
      <Section>
        <ReviewNote title="Course details — company confirmation required">
          <p>
            Specific courses, accreditations, certificates, outcomes, dates and
            any fees will be published here only when confirmed by Crown Power.
            We do not claim professional-body recognition or accreditation that
            has not been verified.
          </p>
        </ReviewNote>
      </Section>
      <CTASection
        title="Interested in training with us?"
        text="Tell us about your goals and we'll let you know what's available."
        label="Apply Now →"
        href="/application"
        secondary={{ label: "See Internships", href: "/internships" }}
      />
    </>
  );
}
export function WhyGreenEnergyPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights · Why Green Energy"
        title="Why green energy is a sound business decision."
        description="Renewable and smart-energy systems can reduce emissions, improve resilience and lower long-term energy costs — when they are engineered around your site, tariffs and objectives."
        image="/images/home/wind-energy-transition.jpg"
      />
      <Section>
        <div className="split split-top">
          <h2 className="lead">
            The move to clean power is reshaping how organisations buy, generate
            and manage energy.
          </h2>
          <p>
            The right combination of generation, storage and intelligent control
            can turn energy from a fixed overhead into a managed, optimised
            asset. The benefits below depend on your site, load profile, tariffs
            and applicable regulation — so we assess each case individually
            rather than promising universal outcomes.
          </p>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="Potential Benefits"
          title="A considered approach to cleaner energy."
        />
        <Cards items={green.benefits} columns={2} />
      </Section>
      <Section>
        <SectionHeading
          eyebrow="The Building Blocks"
          title="Technologies that work best together."
        />
        <Cards items={green.tech} columns={4} />
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="From Enquiry to Energised"
          title="We support the whole journey."
          text="Adopting renewable energy involves more than hardware. We help manage the planning, paperwork and connections around a project."
        />
        <Process items={green.journey} />
      </Section>
      <Section>
        <div className="split split-top">
          <div>
            <p className="eyebrow">The Wider Picture</p>
            <h2>Understanding a changing electricity system.</h2>
          </div>
          <div>
            <p>
              Explore live grid data — the GB electricity mix, renewable output
              and regional demand — on our Services page. Understanding these
              patterns is the first step to using energy more intelligently.
            </p>
            <Link href="/services#live" className="text-link">
              Explore live energy data →
            </Link>
          </div>
        </div>
      </Section>
      <Section tone="surface">
        <SectionHeading
          eyebrow="UK clean-power context"
          title="The policy context behind the transition."
        />
        <ReviewNote title="Original-site context — verification pending">
          <p>
            The original website referenced the following UK government
            priorities. They are retained as source context pending confirmation
            of dates and current policy wording, rather than as Crown Power
            targets or commitments.
          </p>
          <ul>
            <li>Clean power by 2035</li>
            <li>Affordable bills and a sustainable retail market</li>
            <li>Warmer homes and cleaner transport</li>
            <li>Mission-led Government</li>
            <li>Closer UK–EU energy and climate cooperation</li>
          </ul>
        </ReviewNote>
      </Section>
      <CTASection
        title="Is green energy right for your site?"
        text="Our engineers can assess your requirements and outline the options."
        label="Request an Assessment →"
        secondary={{ label: "Explore Our Services", href: "/services" }}
      />
    </>
  );
}
