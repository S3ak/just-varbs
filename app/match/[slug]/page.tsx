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
  const p1Query = search.p1Query;
  const p2Query = search.p2Query;
  let p1Answer = "";
  let p2Answer = "";

  if (p1Query) {
    p1Answer = await getSong(p1Query);
  }

  if (p2Query) {
    p2Answer = await getSong(p2Query);
  }

  return (
    <div className="max-w-7xl mx-auto text-center">
      <Game
        id={slug}
        initialP1Answer={p1Answer}
        initialP2Answer={p2Answer}
        initialSearchParams={search}
      />
    </div>
  );
}
