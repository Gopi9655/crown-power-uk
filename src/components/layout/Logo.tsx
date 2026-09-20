import Link from "next/link";
export function Logo() {
  return (
    <Link
      href="/"
      className="brand"
      aria-label="Crown Power Energy Systems — home"
    >
      <svg viewBox="0 0 120 96" width="38" height="31" aria-hidden="true">
        <path
          d="M18 74 10 26 37 56 60 10 83 56 110 26 102 74Z"
          fill="#F2C63D"
        />
        <path d="M27 68 21 34 40 52 60 20 80 52 99 34 93 68Z" fill="#0A3AA5" />
        <rect x="22" y="80" width="76" height="9" rx="3" fill="#D9A81A" />
        <path
          d="m63 40-13 23h9l-5 27 19-34h-9Z"
          fill="#F2C63D"
          stroke="#0A3AA5"
          strokeWidth="1.4"
        />
      </svg>
      <span>
        <strong>CROWN POWER</strong>
        <small>ENERGY SYSTEMS</small>
      </span>
    </Link>
  );
}
