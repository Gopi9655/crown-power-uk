import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "./Container";
import { offices } from "@/data/site";

export function Button({
  children,
  href,
  secondary = false,
}: {
  children: ReactNode;
  href: string;
  secondary?: boolean;
}) {
  return (
    <Link
      className={`button ${secondary ? "button-secondary" : "button-primary"}`}
      href={href}
    >
      {children}
    </Link>
  );
}
export function SectionHeading({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-heading">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
export function Section({
  children,
  tone = "",
  id,
  className = "",
}: {
  children: ReactNode;
  tone?: string;
  id?: string;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${tone} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}
export function Photo({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={`photo ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 800px) 100vw, (max-width: 1440px) 50vw, 640px"
      />
    </div>
  );
}
export function Cards({
  items,
  columns = 3,
}: {
  items: { title: string; desc: string; n?: string; tag?: string }[];
  columns?: number;
}) {
  return (
    <div className={`card-grid columns-${columns}`}>
      {items.map((item, i) => (
        <article className="card" key={item.title}>
          <span className="index">
            {item.tag || item.n || String(i + 1).padStart(2, "0")}
          </span>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </article>
      ))}
    </div>
  );
}
export function Checklist({ items }: { items: string[] }) {
  return (
    <ul className="checklist">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
export function Process({
  items,
}: {
  items: { title: string; desc: string; n: string }[];
}) {
  return (
    <ol className="process">
      {items.map((item) => (
        <li key={item.title}>
          <span className="index">{item.n}</span>
          <h3>{item.title}</h3>
          <p>{item.desc}</p>
        </li>
      ))}
    </ol>
  );
}
export function ReviewNote({
  children,
  title = "Company confirmation required",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <aside className="review-note">
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}
export function OfficeCards() {
  return (
    <div className="card-grid columns-3">
      {offices.map((o) => (
        <article className="card office-card" key={o.city}>
          <span className="index">{o.country}</span>
          <h3>{o.city}</h3>
          <p>{o.detail}</p>
          {o.email && <a href={`mailto:${o.email}`}>{o.email}</a>}
          <a href={`tel:${o.tel}`}>{o.phone}</a>
          <a href={o.website}>{new URL(o.website).hostname} ↗</a>
          <a href={`https://wa.me/${o.tel.slice(1)}`}>WhatsApp ↗</a>
        </article>
      ))}
    </div>
  );
}
export function CTASection({
  title = "Let’s build smarter energy infrastructure.",
  text = "Talk to our engineers about renewable integration, smart-energy technology or industrial power systems for your next project.",
  label = "Start a Conversation →",
  href = "/contact#enquiry",
  secondary,
}: {
  title?: string;
  text?: string;
  label?: string;
  href?: string;
  secondary?: { label: string; href: string };
}) {
  return (
    <Section tone="dark cta">
      <h2>{title}</h2>
      <p>{text}</p>
      <div className="actions">
        <Button href={href}>{label}</Button>
        {secondary && (
          <Button secondary href={secondary.href}>
            {secondary.label}
          </Button>
        )}
      </div>
    </Section>
  );
}
export function EnergyFlow() {
  return (
    <ol
      className="energy-flow"
      aria-label="Energy flow from generation through storage and the grid to industry"
    >
      {["Renewable", "Storage", "Smart Grid", "Industry"].map((label, i) => (
        <li key={label}>
          <span className="energy-node" aria-hidden="true">
            {["↗", "▥", "⌁", "▤"][i]}
          </span>
          <strong>{label}</strong>
        </li>
      ))}
    </ol>
  );
}
