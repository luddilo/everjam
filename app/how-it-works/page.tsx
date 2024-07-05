import { CustomMDX } from "app/components/mdx";
import { getBlogPosts } from "app/docs/utils";
import { notFound } from "next/navigation";

export default function Page({ params }) {
  let post = getBlogPosts().find((post) => post.slug === "how-it-works");

  if (!post) {
    notFound();
  }

  return (
    <section>
      <h1 className="title font-semibold text-2xl tracking-tighter">
        {post.metadata.title}
      </h1>
      <article className="prose">
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
