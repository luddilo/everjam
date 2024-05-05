import Link from "next/link";
import { SoundcloudEmbed } from "./soundcloudEmbed";

export const metadata = {
  title: "DJ",
  description: "Is dj",
};

const mixes = [
  {
    url: "https://soundcloud.com/luddilo/melodic-and-playful",
    apiUrl:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1585018263&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false",
    title: "Melodic house",
  },
  {
    url: "https://soundcloud.com/luddilo/tech-farm-k9-bar-session-210819",
    apiUrl:
      "https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/1112606482&color=%23ff5500&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false&visual=false",
    title: "Indie dance",
  },
];

export default function Page() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-8 tracking-tighter">DJ</h1>
      <p className="mb-8">
        While I'm first and foremost identifying as dancer, I love to DJ
        occasionally.
      </p>
      <p className="mb-8">
        Not much material is recorded, but a few mixes are on{" "}
        <Link href={"https://soundcloud.com/luddilo"}>my soundcloud. My favorites are these two:</Link>
      </p>
      {mixes.map((mix) => (
        <SoundcloudEmbed {...mix} />
      ))}
    </section>
  );
}
