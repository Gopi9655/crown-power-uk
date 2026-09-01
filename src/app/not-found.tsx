import Link from "next/link";
import { Container } from "@/components/ui/Container";
export default function NotFound(){return <section className="not-found"><Container><span className="not-found__code">ERROR 404</span><h1>That page isn&apos;t on the grid.</h1><p>The address may have changed, or the page may no longer be available. Use the main navigation or return to the Crown Power homepage.</p><Link href="/" className="button button--gold">Return home →</Link></Container></section>}
