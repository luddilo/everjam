import { BlogPosts } from "app/components/posts";
import Link from "next/link";

export const metadata = {
  title: "Dancing",
  description: "Is dancing",
};

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">Dancing</h1>
      <p className="mb-8">
        I have always been dancing, but only recently (fall 2023) did I fall
        headlessly in love with contact improvisation. Before that, I knew I
        loved contact impro, but it was something that I occasionally was lucky
        to do at an ecstatic dance or at a party. In 2023, I realized that there
        are people equally (well.. equally is a strong word in this case)
        obsessed with the practise, and frequent jams where people go to do
        exactly this.
      </p>
      <p className="mb-8">
        I went to on Jam in Barcelona and decided to throw myself at{" "}
        <Link href={"https://www.instagram.com/pedropaz_arrabidadancelabs/"}>
          Pedro Paz' Arrabida Dance labs
        </Link>{" "}
        hosted by the community{" "}
        <Link href="https://servivo.earth">SerVivo</Link> outside lisbon. 9
        days, most of which was dancing contact. Since then, I have danced
        almost every day. I have chased contact from Barcelona to Alvarve,
        Lisbon, Berlin and finally back to Barcelona where I am now jamming few
        times per week and also have a small dance space in my apartment in
        Gracia.
      </p>
      <p className="mb-8">
        I am not sure how dancing will come to shape my life, but never have I
        felt a calling stronger than this.{" "}
      </p>
    </section>
  );
}
