"use client";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import announcements from "@/data/content/Announcements.json";
import { PageHero } from "../ui/PageHero";
import { Section, ReviewNote } from "../ui/Sections";
export function AnnouncementReader() {
  const [selected, setSelected] = useState<number | null>(null);
  const opener = useRef(0);
  const current = selected === null ? null : announcements[selected];
  const open = (index: number) => {
    opener.current = index;
    setSelected(index);
    requestAnimationFrame(() => {
      document.getElementById("article-start")?.focus();
      window.scrollTo({ top: 0, behavior: "instant" });
    });
  };
  const back = () => {
    setSelected(null);
    requestAnimationFrame(() =>
      document.getElementById(`announcement-${opener.current}`)?.focus(),
    );
  };
  return current ? (
    <>
      <div id="article-start" tabIndex={-1}>
        <PageHero
          eyebrow={`${current.category} · ${current.date}`}
          title={current.title}
          description="Crown Power · Statements & Announcements"
        />
      </div>
      <Section>
        <article className="article-body">
          <button className="text-button article-back" onClick={back}>
            ← All announcements
          </button>
          <p className="lead">{current.lead}</p>
          {current.body.map((p) => (
            <p key={p}>{p}</p>
          ))}
          <ReviewNote title="Full statement — verify before publication">
            <p>
              The complete published text of this statement will be migrated
              from the official source and confirmed by Crown Power before going
              live. The text above is the supplied design summary.
            </p>
          </ReviewNote>
          <div className="actions">
            <button className="text-button" onClick={back}>
              ← Back to all announcements
            </button>
            <Link className="text-link" href="/contact">
              Contact Crown Power →
            </Link>
          </div>
        </article>
      </Section>
    </>
  ) : (
    <>
      <PageHero
        eyebrow="Insights · Statements & Announcements"
        title="Statements & announcements."
        description="Updates and perspectives from Crown Power Energy Systems."
      />
      <Section>
        <button
          id="announcement-0"
          className="article-featured"
          onClick={() => open(0)}
        >
          <span className="photo">
            <Image
              src="/images/services/power-systems.jpg"
              alt=""
              fill
              sizes="(max-width:768px) 100vw, 50vw"
            />
          </span>
          <span className="card-body">
            <span className="index">Featured</span>
            <span className="article-meta">
              {announcements[0].category} · {announcements[0].date}
            </span>
            <h2>{announcements[0].title}</h2>
            <p>{announcements[0].lead}</p>
            <span className="text-link">Read statement →</span>
          </span>
        </button>
        <div className="card-grid">
          {announcements.slice(1).map((a, i) => (
            <button
              key={a.title}
              id={`announcement-${i + 1}`}
              className="card article-card"
              onClick={() => open(i + 1)}
            >
              <span className="article-meta">
                {a.category} · {a.date}
              </span>
              <h2>{a.title}</h2>
              <span className="text-link">Read statement →</span>
            </button>
          ))}
        </div>
      </Section>
    </>
  );
}
