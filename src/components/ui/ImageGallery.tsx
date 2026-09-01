"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const images = Array.from({ length: 7 }, (_, index) => `/images/transformers/smart-grid-transformer-${String(index + 1).padStart(2, "0")}.png`);

export function ImageGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selected === null) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
        requestAnimationFrame(() => openerRef.current?.focus());
      }
      if (event.key === "ArrowRight") setSelected((value) => value === null ? null : (value + 1) % images.length);
      if (event.key === "ArrowLeft") setSelected((value) => value === null ? null : (value - 1 + images.length) % images.length);
      if (event.key === "Tab") {
        const focusable = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>("button") ?? []);
        const first = focusable[0];
        const last = focusable.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = overflow; window.removeEventListener("keydown", onKey); };
  }, [selected]);

  const close = () => {
    setSelected(null);
    requestAnimationFrame(() => openerRef.current?.focus());
  };

  return <>
    <div className="gallery-grid">
      {images.map((src, index) => <button key={src} type="button" className="gallery-button" onClick={(event) => { openerRef.current = event.currentTarget; setSelected(index); }} aria-label={`Open smart grid transformer image ${index + 1}`}><Image src={src} alt={`Crown Power smart grid transformer, view ${index + 1}`} fill sizes="(max-width:620px) 100vw, 33vw" /><span><Expand size={16} aria-hidden="true" /></span></button>)}
    </div>
    {selected !== null && <div ref={dialogRef} className="lightbox" role="dialog" aria-modal="true" aria-label={`Smart grid transformer image ${selected + 1} of ${images.length}`} onMouseDown={(event) => { if (event.target === event.currentTarget) close(); }}>
      <button ref={closeRef} type="button" className="lightbox__close" onClick={close} aria-label="Close image gallery"><X size={24} /></button>
      <button type="button" className="lightbox__nav lightbox__nav--prev" onClick={() => setSelected((selected - 1 + images.length) % images.length)} aria-label="Previous image"><ChevronLeft size={29} /></button>
      <Image src={images[selected]} alt={`Crown Power smart grid transformer, enlarged view ${selected + 1}`} width={1400} height={1050} className="lightbox__image" priority />
      <button type="button" className="lightbox__nav lightbox__nav--next" onClick={() => setSelected((selected + 1) % images.length)} aria-label="Next image"><ChevronRight size={29} /></button>
    </div>}
  </>;
}
