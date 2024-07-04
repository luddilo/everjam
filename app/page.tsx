import Link from "next/link";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Everjam</h1>
      <p className="mb-4">The always-open contact improvisation studio</p>
      <p className="mb-4">
        First prototype of an Everjam studio:{" "}
        <Link href={"/barcelona"}>
          <span style={{ textDecoration: "underline" }}>Barcelona</span>
        </Link>
      </p>
    </section>
  );
}
