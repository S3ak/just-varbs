import Game from "@/components/game";
import { getSong } from "./actions";

const getWinner = (search: Record<string, string> | undefined) => {
  let winner = "";

  if (!search) {
    return winner;
  }

  if (search.vote === "player1") {
    winner = search.p1Name;
  } else if (search.vote === "player1") {
    winner = search.p2Name;
  }

  return winner;
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const rawSearch = await searchParams;

  const search: Record<string, string> = Object.fromEntries(
    Object.entries(rawSearch).map(([key, value]) => [
      key,
      Array.isArray(value) ? value[0] : (value ?? ""),
    ])
  );

  const p1Query = search.p1Query === "undefined" ? "" : search.p1Query;
  const p2Query = search.p2Query === "undefined" ? "" : search.p2Query;
  const p1Answer = p1Query ? await getSong(p1Query) : "";
  const p2Answer = p2Query ? await getSong(p2Query) : "";
  const winner = getWinner(search);

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
        initialWinner={winner}
      />
    </div>
  );
}
