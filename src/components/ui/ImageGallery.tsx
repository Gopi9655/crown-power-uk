"use client";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "./Modal";
const images = Array.from(
  { length: 7 },
  (_, i) =>
    `/images/transformers/smart-grid-transformer-${String(i + 1).padStart(2, "0")}.png`,
);
export function ImageGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const step = (direction: number) =>
    setSelected((value) =>
      value === null
        ? null
        : (value + direction + images.length) % images.length,
    );
  return (
    <>
      <div className="gallery-grid">
        {images.map((src, i) => (
          <button
            className="gallery-button"
            key={src}
            aria-label={`Open transformer image ${i + 1}`}
            onClick={() => setSelected(i)}
          >
            <Image
              src={src}
              alt={`Crown Power smart grid transformer — view ${i + 1}`}
              fill
              sizes="(max-width:900px) 50vw, 33vw"
            />
            <span aria-hidden="true">↗</span>
          </button>
        ))}
      </div>
      {selected !== null && (
        <Modal
          title="Transformer gallery"
          onClose={() => setSelected(null)}
          className="gallery-modal"
          onKeyDown={(event) => {
            if (event.key === "ArrowRight") step(1);
            if (event.key === "ArrowLeft") step(-1);
          }}
        >
          <div>
            <Image
              src={images[selected]}
              alt={`Crown Power smart grid transformer — view ${selected + 1}`}
              width={1400}
              height={1050}
              sizes="90vw"
            />
            <div className="gallery-controls">
              <button
                className="icon-button"
                onClick={() => step(-1)}
                aria-label="Previous image"
              >
                ←
              </button>
              <span role="status">
                {selected + 1} / {images.length}
              </span>
              <button
                className="icon-button"
                onClick={() => step(1)}
                aria-label="Next image"
              >
                →
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
