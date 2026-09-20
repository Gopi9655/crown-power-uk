"use client";
import Image from "next/image";
import { useState } from "react";
import team from "@/data/content/MeetTheTeam.json";
import { Modal } from "../ui/Modal";
const categories = [
  "All",
  "Leadership",
  "Engineering",
  "Technology",
  "Business",
  "Sustainability",
  "Legal",
];
export function TeamDirectory() {
  const [filter, setFilter] = useState("All");
  const [selected, setSelected] = useState<(typeof team)[number] | null>(null);
  const visible = team.filter((p) => filter === "All" || p.cat === filter);
  return (
    <>
      <div
        className="team-toolbar"
        role="group"
        aria-label="Filter team by discipline"
      >
        {categories.map((c) => (
          <button
            className="filter-button"
            key={c}
            aria-pressed={filter === c}
            onClick={() => setFilter(c)}
          >
            {c}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {visible.length} profiles shown
      </p>
      <div className="team-grid">
        {visible.map((person) => (
          <button
            className="team-card"
            key={person.name}
            onClick={() => setSelected(person)}
            aria-label={`View profile for ${person.name}`}
          >
            <span className="team-photo">
              <Image
                src={person.image}
                alt={person.name}
                fill
                sizes="(max-width:768px) 50vw, (max-width:1180px) 33vw, 25vw"
              />
            </span>
            <span className="card-body">
              <span className="team-category">{person.cat}</span>
              <h2>{person.name}</h2>
              <p>{person.role}</p>
              <span className="profile-link">View profile →</span>
            </span>
          </button>
        ))}
      </div>
      {selected && (
        <Modal
          title={`Profile: ${selected.name}`}
          onClose={() => setSelected(null)}
          className="profile-modal"
        >
          <div className="profile-layout">
            <div className="team-photo">
              <Image
                src={selected.image}
                alt={selected.name}
                fill
                sizes="220px"
              />
            </div>
            <div>
              <span className="team-category">{selected.cat}</span>
              <h2>{selected.name}</h2>
              <p>
                <strong>{selected.role}</strong>
              </p>
              <p>{selected.bio}</p>
              {selected.email && (
                <a href={`mailto:${selected.email}`}>{selected.email}</a>
              )}
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
