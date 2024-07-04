import Link from "next/link";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Everjam</h1>
      <p className="mb-4">
        The always-open contact improvisation studio
      </p>
      <p className="mb-4">
        First Everjam studio: <Link href={"/studios/barcelona"}>Barcelona</Link>
      </p>
    </section>
  );
}
