import Image from "next/image";
import type { ReactNode } from "react";
import { Container } from "./Container";
export function PageHero({
  eyebrow,
  title,
  description,
  image,
  children,
  home = false,
  light = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description: string;
  image?: string;
  children?: ReactNode;
  home?: boolean;
  light?: boolean;
}) {
  return (
    <section
      className={`page-hero ${home ? "home-hero" : ""} ${light ? "light-hero" : ""}`}
    >
      {image && (
        <>
          <Image
            className="hero-image"
            src={image}
            alt=""
            fill
            sizes="100vw"
            preload
          />
          <div className="hero-shade" />
        </>
      )}
      <Container>
        <div className="hero-copy">
          <p className="eyebrow">{eyebrow}</p>
          <h1>{title}</h1>
          <p className="hero-description">{description}</p>
          {children && <div className="actions">{children}</div>}
        </div>
      </Container>
    </section>
  );
}
