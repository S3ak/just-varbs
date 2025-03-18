import Game from "@/components/game";
import { getSong } from "./actions";

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const search = await searchParams;
  const p1Query = search.p1Query === "undefined" ? "" : search.p1Query;
  const p2Query = search.p2Query === "undefined" ? "" : search.p2Query;
  const p1Answer = p1Query ? await getSong(p1Query) : "";
  const p2Answer = p2Query ? await getSong(p2Query) : "";

  console.warn("search", search);

  return (
    <div className="max-w-7xl mx-auto text-center">
      <Game
        id={slug}
        initialP1Name={search.p1Name}
        initialP1Query={p1Query}
        initialP2Name={search.p2Name}
        initialP2Query={search.p2Query}
        initialP1Answer={p1Answer}
        initialP2Answer={p2Answer}
        initialSearchParms={search}
      />
    </div>
  );
}
