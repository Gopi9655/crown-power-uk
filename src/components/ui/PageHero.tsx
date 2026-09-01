import Image from "next/image";
import Link from "next/link";
import { Container } from "./Container";

export function PageHero({ eyebrow, title, intro, image, primary, secondary }: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className={`page-hero ${image ? "page-hero--image" : ""}`}>
      {image && <Image src={image} alt="" fill priority sizes="100vw" className="page-hero__image" />}
      <div className="page-hero__scrim" />
      <Container className="page-hero__inner">
        <p className="hero-eyebrow"><span />{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-hero__intro">{intro}</p>
        {(primary || secondary) && <div className="hero-actions">
          {primary && <Link href={primary.href} className="button button--gold">{primary.label} <span aria-hidden="true">→</span></Link>}
          {secondary && <Link href={secondary.href} className="button button--outline-light">{secondary.label}</Link>}
        </div>}
      </Container>
    </section>
  );
}
