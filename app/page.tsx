import Link from "next/link";

export default function Page() {
  return (
    <section>
      <h1 className="mb-8 text-2xl font-semibold tracking-tighter">Everjam</h1>
      <p className="mb-4">
        An always-open, residential, contact improvisation studio in Barcelona
      </p>
      <p className="mb-4">
        What? Why? How? Read about the project{" "}
        <Link href={"/vision"}>
          <span style={{ textDecoration: "underline" }}>vision</span>
        </Link>{" "}
        or{" "}
        <Link href={"/how-it-works"}>
          <span style={{ textDecoration: "underline" }}>how-it-works</span>
        </Link>
      </p>
      <p className="mb-4">
        To start jamming, go to{" "}
        <Link href={"/jam"}>
          <span style={{ textDecoration: "underline" }}>jams</span>
        </Link>
      </p>
      <p className="mb-4">
        To become a resident go to{" "}
        <Link href={"/residency"}>
          <span style={{ textDecoration: "underline" }}>residency</span>
        </Link>
      </p>
    </section>
  );
}
