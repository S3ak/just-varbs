import {
  getSong,
  onJudgeNameSubmit,
  onJudgeVote,
  onSubmitPlayerAnswerAction,
} from "./actions";
import Button from "@/components/button";
import { FaChevronLeft } from "react-icons/fa";
import Link from "next/link";
import Form from "next/form";
import InputField from "@/components/input-field";
import { addParamsToURL, getWinner } from "@/lib/game/utils";
import ShareGame from "@/components/game/share-game";
import { Spotify } from "react-spotify-embed";
import MainMenu from "@/components/main-menu";
import PollingComponent from "./polling-component";

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

  // Get values from query params with proper fallbacks
  const player1Name = search.player1Name || "";
  const player2Name = search.player2Name || "";
  const player1Query = search.player1Query || "";
  const player2Query = search.player2Query || "";
  const player1Instagram = search.player1Instagram || "";
  const player2Instagram = search.player2Instagram || "";
  const question = search.question || generateQuestion();
  const genre = search.genre || "hip-hop";

  // Get song answers if queries exist
  const player1Answer = player1Query ? await getSong(player1Query) : "";
  const player2Answer = player2Query ? await getSong(player2Query) : "";
  const winner = getWinner(search);
  const gameLinkURL = addParamsToURL(search, slug);

  const shareData = {
    title: "You've been invited to battle",
    text: `Join the ${genre} battle and see who's the best!`,
    url: gameLinkURL,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 to-zinc-900 text-white">
      <PollingComponent currentUrl={gameLinkURL} />
      <aside className="hidden md:block fixed left-0 top-0 h-full w-72 bg-zinc-950/50 backdrop-blur-sm border-r border-zinc-800">
        <MainMenu />
      </aside>

      <main className="md:ml-72 p-6">
        <section className="flex gap-4 items-center mb-8">
          <Button className="bg-zinc-800 hover:bg-zinc-700">
            <Link href="/" className="flex items-center gap-2">
              <FaChevronLeft />
            </Link>
          </Button>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Music Battle
          </h1>
        </section>

        <div className="text-center mb-12 relative z-10">
          <p className="text-2xl font-semibold mb-4">{question}</p>
          <div className="inline-block px-4 py-2 bg-zinc-800/80 backdrop-blur-sm rounded-full text-sm border border-zinc-700">
            Genre: {genre}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Player 1 Section */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700">
            <h2 className="text-2xl font-bold mb-6 text-purple-400">
              Player 1
            </h2>
            <section>
              <Form action={onSubmitPlayerAnswerAction}>
                <input type="hidden" name="id" defaultValue={slug} />
                <input type="hidden" name="playerNumber" defaultValue="1" />
                <input
                  type="hidden"
                  name="currentUrl"
                  defaultValue={gameLinkURL}
                />
                <div className="space-y-4">
                  <InputField
                    label="Your Name"
                    name="player1Name"
                    placeholder="Thabo"
                    required
                    defaultValue={player1Name}
                    disabled={Boolean(player1Answer)}
                    className="bg-zinc-900 border-zinc-700 text-white"
                  />

                  <InputField
                    label="Your Instagram Handle"
                    name="player1Instagram"
                    placeholder="@thabo"
                    defaultValue={player1Instagram}
                    disabled={Boolean(player1Answer)}
                    className="bg-zinc-900 border-zinc-700 text-white"
                  />

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Song
                    </label>
                    <input
                      type="text"
                      name="player1Query"
                      defaultValue={player1Query}
                      placeholder="Enter a song"
                      className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      disabled={!!player1Query}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full p-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={!!player1Query}
                  >
                    Submit Answer
                  </button>
                </div>
              </Form>

              {player1Answer && (
                <div className="mt-4">
                  <Spotify link={player1Answer} />
                </div>
              )}
            </section>
            {!winner && player1Answer && (
              <Form action={onJudgeVote}>
                <input type="hidden" name="id" defaultValue={slug} />
                <input type="hidden" name="vote" defaultValue="player1" />
                <input
                  type="hidden"
                  name="currentUrl"
                  defaultValue={gameLinkURL}
                />
                <input type="hidden" name="judgeName" defaultValue="Judge" />
                <Button type="submit" data-testid="judge-vote-player1">
                  Vote
                </Button>
              </Form>
            )}
          </div>

          {/* VS Section */}
          <div className="flex items-center justify-center">
            <div className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
              VS
            </div>
          </div>

          {/* Player 2 Section */}
          <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700">
            <h2 className="text-2xl font-bold mb-6 text-pink-400">Player 2</h2>
            <section>
              <Form action={onSubmitPlayerAnswerAction}>
                <input type="hidden" name="id" defaultValue={slug} />
                <input type="hidden" name="playerNumber" defaultValue="2" />
                <input
                  type="hidden"
                  name="currentUrl"
                  defaultValue={gameLinkURL}
                />
                <div className="space-y-4">
                  <InputField
                    label="Your Name"
                    name="player2Name"
                    placeholder="Frank"
                    required
                    defaultValue={player2Name}
                    disabled={Boolean(player2Answer)}
                    className="bg-zinc-900 border-zinc-700 text-white"
                  />

                  <InputField
                    label="Your Instagram Handle"
                    name="player2Instagram"
                    placeholder="@frank"
                    defaultValue={player2Instagram}
                    disabled={Boolean(player2Answer)}
                    className="bg-zinc-900 border-zinc-700 text-white"
                  />

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Your Song
                    </label>
                    <input
                      type="text"
                      name="player2Query"
                      defaultValue={player2Query}
                      placeholder="Enter a song"
                      className="w-full p-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      disabled={!!player2Query}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full p-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    disabled={!!player2Query}
                    data-testid="player2-submit-answer"
                  >
                    Submit Answer
                  </button>
                </div>
              </Form>

              {player2Answer && (
                <div className="mt-4">
                  <Spotify link={player2Answer} />
                </div>
              )}
            </section>
            {!winner && player2Answer && (
              <Form action={onJudgeVote}>
                <input type="hidden" name="id" defaultValue={slug} />
                <input type="hidden" name="vote" defaultValue="player2" />
                <input
                  type="hidden"
                  name="currentUrl"
                  defaultValue={gameLinkURL}
                />
                <input type="hidden" name="judgeName" defaultValue="Judge" />
                <Button type="submit" data-testid="judge-vote-player2">
                  Vote
                </Button>
              </Form>
            )}
          </div>
        </div>

        {/* Winner Section */}
        {winner && (
          <div className="mt-12 text-center">
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">🏆 Winner 🏆</h2>
              <p className="text-xl">
                {winner === "player1"
                  ? player1Name || "Player 1"
                  : player2Name || "Player 2"}{" "}
                has won the battle!
              </p>
            </div>
          </div>
        )}

        {/* Judge Section */}
        {!winner && (
          <div className="mt-12">
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700 max-w-md mx-auto">
              <h2 className="text-2xl font-bold mb-6 text-center">
                Whose the Judge?
              </h2>
              {!search.judgeName ? (
                <Form action={onJudgeNameSubmit}>
                  <InputField
                    label="Judge Name"
                    name="judgeName"
                    placeholder="Enter your name"
                    required
                    className="bg-zinc-800 border-zinc-600 text-white placeholder-zinc-400"
                    data-testid="judge-name-input"
                  />
                  <input type="hidden" name="id" defaultValue={slug} />
                  <input
                    type="hidden"
                    name="currentUrl"
                    defaultValue={gameLinkURL}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-yellow-600 hover:bg-yellow-700 mt-7"
                    data-testid="judge-name-submit"
                  >
                    Submit Name
                  </Button>
                </Form>
              ) : null}
            </div>
          </div>
        )}

        <ShareGame shareData={shareData} />
      </main>
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
