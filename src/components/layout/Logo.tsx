import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand-logo" aria-label="Crown Power Energy Systems home">
      <Image
        src="/images/brand/crown-power-app-icon.png"
        alt=""
        width={40}
        height={40}
        className="brand-logo__mark"
        priority
      />
      <span className="brand-logo__type">
        <span className="brand-logo__name">CROWN POWER</span>
        {!compact && <span className="brand-logo__sub">ENERGY SYSTEMS</span>}
      </span>
    </Link>
  );
}
