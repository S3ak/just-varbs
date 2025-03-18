import {
  getSong,
  onJudgeNameSubmit,
  onJudgeVote,
  onSubmitAnswerAction,
} from "./actions";
import Button from "@/components/button";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import Form from "next/form";
import InputField from "@/components/input-field";
import { addParamsToURL } from "@/lib/game/utils";
import ShareGame from "@/components/game/share-game";
import { Spotify } from "react-spotify-embed";

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
  const paramsObj = await params;
  const { slug } = paramsObj;
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
  const p1Name = search.p1Name === "undefined" ? "" : search.p1Name;
  const p2Name = search.p2Name === "undefined" ? "" : search.p2Name;
  const winner = getWinner(search);
  const question = search.question ?? generateQuestion();
  const gameLinkURL = addParamsToURL(search, slug);

  const shareData = {
    title: "You've been invited to battle",
    text: "Hope onto the battle and see who's the best",
    url: gameLinkURL,
  };

  const onSubmitAnswerActionWithSearch = onSubmitAnswerAction.bind(
    null,
    search
  );

  const handleJudgeVote = onJudgeVote.bind(null, search);
  const handleJudgeNameSubmit = onJudgeNameSubmit.bind(null, search);

  return (
    <div className="max-w-7xl mx-auto text-center">
      <section className="flex gap-4 items-center justify-center container mx-auto max-w-4xl">
        <Button>
          <Link href="/" className="flex items-center gap-2">
            <FaChevronLeft />
          </Link>
        </Button>
        <h1 className="text-5xl font-bold mb-4">Start a New Game</h1>
      </section>

      <p className="text-xl mb-8">{question}</p>

      <section className="flex justify-center gap-4 flex-wrap">
        <div className="flex flex-col" role="column">
          <h2>Player 1</h2>
          <section>
            <Form action={onSubmitAnswerActionWithSearch}>
              <InputField
                label="Your Name"
                name="p1Name"
                placeholder="Thabo"
                required
                defaultValue={p1Name === "undefined" ? "" : p1Name}
                disabled={Boolean(p1Answer)}
              />

              <InputField
                label="Your Answer"
                name="p1Query"
                placeholder="VOID"
                required
                defaultValue={p1Query === "undefined" ? "" : p1Query}
                disabled={Boolean(p1Answer)}
              />

              <input hidden name="id" value={slug} readOnly />

              {!p1Answer && <Button type="submit">Submit</Button>}
            </Form>

            {p1Answer && (
              <div className="mt-4">
                <Spotify link={p1Answer} />
              </div>
            )}
          </section>
          {!winner && p1Answer && (
            <Form action={handleJudgeVote}>
              <input hidden name="id" value={slug} readOnly />
              <input hidden name="vote" value="player1" readOnly />
              <input hidden name="judgeName" value="Judge" readOnly />
              <Button type="submit">Vote</Button>
            </Form>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <strong>VS</strong>
        </div>

        <div className="flex flex-col" role="column">
          <h2>Player 2</h2>
          <section>
            <Form action={onSubmitAnswerActionWithSearch}>
              <InputField
                label="Your Name"
                name="p2Name"
                placeholder="Frank"
                required
                defaultValue={p2Name === "undefined" ? "" : p2Name}
                disabled={Boolean(p2Answer)}
              />

              <InputField
                label="Your Answer"
                name="p2Query"
                placeholder="I am muic"
                required
                defaultValue={p2Query === "undefined" ? "" : p2Query}
                disabled={Boolean(p2Answer)}
              />

              <input hidden name="id" value={slug} readOnly />

              {!p2Answer && <Button type="submit">Submit</Button>}
            </Form>

            {p2Answer && (
              <div className="mt-4">
                <Spotify link={p2Answer} />
              </div>
            )}
          </section>
          {!winner && p2Answer && (
            <Form action={handleJudgeVote}>
              <input hidden name="id" value={slug} readOnly />
              <input hidden name="vote" value="player2" readOnly />
              <input hidden name="judgeName" value="Judge" readOnly />
              <Button type="submit">Vote</Button>
            </Form>
          )}
        </div>
      </section>

      <section className="mt-8 border-t pt-8">
        {winner && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">🏆 Winner 🏆</h2>
            <p className="text-xl">
              {winner === "player1"
                ? p1Name || "Player 1"
                : p2Name || "Player 2"}{" "}
              has won the battle!
            </p>
          </div>
        )}
      </section>

      {!winner && (
        <section className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Whose the Judge</h2>
          {!search.judgeName ? (
            <Form action={handleJudgeNameSubmit}>
              <InputField
                label="Judge Name"
                name="judgeName"
                placeholder="Enter your name"
                required
              />
              <input hidden name="id" value={slug} readOnly />
              <Button type="submit">Submit Name</Button>
            </Form>
          ) : (
            <Form action={handleJudgeVote}>
              <div className="mb-4">
                <p className="text-lg">Judge: {search.judgeName}</p>
              </div>

              <input hidden name="id" value={slug} readOnly />
              <input
                hidden
                name="judgeName"
                value={search.judgeName}
                readOnly
              />

              <Button type="submit">Submit Vote</Button>
            </Form>
          )}
        </section>
      )}

      <ShareGame shareData={shareData} />
    </div>
  );
}

async function generateQuestion() {
  // To be implemented with AI integration
  const questions = [
    "What song best captures the feeling of summer?",
    "Which artist has the most iconic album cover?",
    "What song would be perfect for a road trip?",
    "Which artist has the most consistent discography?",
    "What song would be perfect for a workout playlist?",
    "Which album has the strongest opening track?",
    "What song would be perfect for a romantic dinner?",
    "Which artist has evolved the most throughout their career?",
    "What song best represents the 90s?",
    "Which album tells the most compelling story?",
  ];

  return questions[Math.floor(Math.random() * questions.length)];
}
