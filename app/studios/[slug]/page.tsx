import { Studio } from "../../components/studio";

export default function Page({ params }) {
  if (params.slug !== "barcelona") {
    return <div>Not found</div>;
  }

  return <Studio name={params.slug} />;
}
