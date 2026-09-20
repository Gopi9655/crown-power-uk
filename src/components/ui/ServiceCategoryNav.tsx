"use client";
import { useEffect, useRef, useState } from "react";
import { services } from "@/data/site";
export function ServiceCategoryNav() {
  const [active, setActive] = useState(services[0].id);
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    const sections = services
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    const update = () => {
      const styles = getComputedStyle(document.documentElement);
      const offset =
        parseFloat(styles.getPropertyValue("--header-height")) +
        parseFloat(styles.getPropertyValue("--local-nav-height")) +
        parseFloat(styles.getPropertyValue("--anchor-gap"));
      let current = sections[0]?.id;
      for (const section of sections)
        if (section.getBoundingClientRect().top <= offset + 2)
          current = section.id;
      if (current) setActive(current);
    };
    let frame = 0;
    const schedule = () => {
      if (!frame)
        frame = requestAnimationFrame(() => {
          update();
          frame = 0;
        });
    };
    const observer = new IntersectionObserver(schedule, {
      threshold: [0, 0.25, 0.5, 1],
    });
    sections.forEach((s) => observer.observe(s));
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);
  useEffect(() => {
    const link = nav.current?.querySelector<HTMLElement>(
      '[aria-current="location"]',
    );
    const container = link?.parentElement;
    if (link && container)
      container.scrollTo({
        left: Math.max(0, link.offsetLeft - container.offsetLeft - 16),
        behavior: "instant",
      });
  }, [active]);
  return (
    <nav ref={nav} className="local-nav" aria-label="Service categories">
      <div className="site-container">
        {services.map((s) => (
          <a
            href={`#${s.id}`}
            key={s.id}
            aria-current={active === s.id ? "location" : undefined}
          >
            {s.title}
          </a>
        ))}
      </div>
    </nav>
  );
}
