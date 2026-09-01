"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { team, teamCategories, type TeamMember } from "@/data/team";

export function TeamDirectory() {
  const [filter, setFilter] = useState<(typeof teamCategories)[number]>("All");
  const [selected, setSelected] = useState<TeamMember | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const visible = useMemo(() => filter === "All" ? team : team.filter((member) => member.category === filter), [filter]);

  useEffect(() => {
    if (!selected) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        requestAnimationFrame(() => openerRef.current?.focus());
      }
      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button, a[href], [tabindex]:not([tabindex="-1"])'));
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = overflow; window.removeEventListener("keydown", onKey); };
  }, [selected]);

  const close = () => { setSelected(null); requestAnimationFrame(() => openerRef.current?.focus()); };

  return <>
    <div className="team-toolbar" role="group" aria-label="Filter team members">
      {teamCategories.map((category) => <button key={category} type="button" className={`filter-button ${filter === category ? "is-active" : ""}`} aria-pressed={filter === category} onClick={() => setFilter(category)}>{category}</button>)}
    </div>
    <div className="team-grid" aria-live="polite">
      {visible.map((member) => <button key={member.name} type="button" className="team-card" onClick={(event) => { openerRef.current = event.currentTarget; setSelected(member); }} aria-label={`View profile for ${member.name}`}>
        <span className="team-card__image"><Image src={member.image} alt={member.name} fill sizes="(max-width:390px) 100vw, (max-width:620px) 50vw, (max-width:1120px) 33vw, 25vw" /></span>
        <span className="team-card__body"><span className="team-category">{member.category}</span><h2>{member.name}</h2><p>{member.role}</p><span className="team-card__link">View profile <span aria-hidden="true">→</span></span></span>
      </button>)}
    </div>
    {selected && <div className="modal-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <div ref={dialogRef} className="team-modal" role="dialog" aria-modal="true" aria-labelledby="team-modal-title" aria-describedby="team-modal-bio">
        <div className="team-modal__image"><Image src={selected.image} alt={selected.name} fill sizes="220px" /></div>
        <div className="team-modal__body"><button ref={closeRef} type="button" className="team-modal__close" onClick={close} aria-label="Close profile"><X size={20} /></button><span className="team-category">{selected.category}</span><h2 id="team-modal-title">{selected.name}</h2><p className="team-modal__role">{selected.role}</p><p id="team-modal-bio" className="team-modal__bio">{selected.bio}</p>{selected.email && <a className="team-modal__email" href={`mailto:${selected.email}`}>{selected.email}</a>}</div>
      </div>
    </div>}
  </>;
}
