export function SectionHeading({ eyebrow, title, text, light = false, centered = false }: { eyebrow: string; title: string; text?: string; light?: boolean; centered?: boolean }) {
  return (
    <div className={`section-heading ${light ? "section-heading--light" : ""} ${centered ? "section-heading--centered" : ""}`}>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text && <p className="section-heading__text">{text}</p>}
    </div>
  );
}
