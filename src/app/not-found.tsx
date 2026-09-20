import { Button } from "@/components/ui/Sections";
export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404 · Page not found</p>
      <h1>Let’s get you connected.</h1>
      <p>
        This page could not be found. Explore our engineering services or return
        to the homepage.
      </p>
      <div className="actions justify-center">
        <Button href="/">Back to Home →</Button>
        <Button href="/services">Explore Services →</Button>
      </div>
    </section>
  );
}
