"use client";

import React from "react";
import Link from "next/link";
import Form from "next/form";
import { Spotify } from "react-spotify-embed";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import useGameStore from "@/hooks/use-game";
import { toast } from "sonner";
import { addParamsToURL } from "@/lib/game/utils";

import {
  onSubmitAnswerAction,
  onJudgeVote,
  onJudgeNameSubmit,
} from "@/app/match/[slug]/actions";
import { usePathname } from "next/navigation";
import { getBaseURL } from "@/lib/utils";

export default function Game({
  id = "string",
  initialP1Name = "",
  initialP1Query = "",
  initialP2Name = "",
  initialP2Query = "",
  initialP1Answer = "",
  initialP2Answer = "",
  initialSearchParms,
  initialWinner = "",
}: {
  id: string;
  initialP1Name: string;
  initialP1Query: string;
  initialP2Name: string;
  initialP2Query: string;
  initialP1Answer: string;
  initialP2Answer: string;
  initialSearchParms: Record<string, string>;
  initialWinner: string;
}) {
  const generateQuestion = useGameStore((state) => state.generateQuestion);
  const pathName = usePathname();
  // const [state, action, isPending] = useActionState(onSubmitAnswerAction);

  const question = generateQuestion();
  const onSubmitAnswerActionWithSearch = onSubmitAnswerAction.bind(
    null,
    initialSearchParms
  );

  const handleJudgeVote = onJudgeVote.bind(null, initialSearchParms);
  const handleJudgeNameSubmit = onJudgeNameSubmit.bind(
    null,
    initialSearchParms
  );
  // TODO: Easier share code
  // const gameCode = "123456";
  const baseURL = getBaseURL();
  const gameLinkURL = addParamsToURL(
    initialSearchParms,
    id,
    baseURL + pathName
  );

  // const p1form = useForm<z.output<typeof p1FormSchema>>({
  //   resolver: zodResolver(p1FormSchema),
  //   defaultValues: {
  //     p1Query: searchParams.get("p1Query") ?? "",
  //     p1Name: searchParams.get("p1Name") ?? "",
  //   },
  // });

  // function addParamsToURL(data) {
  //   const params = {
  //     p1Name: data.p1Name,
  //     p1Query: data.p1Query,
  //   };

  //   const searchParams = new URLSearchParams(Object.entries(params));
  //   const url = `/match/${id}?${encodeURIComponent(searchParams.toString())}`;
  //   router.replace(url);
  // }

  // if (isPending) {
  //   <div>Loading...</div>;
  // }

  const shareData = {
    title: "You've been invited to battle",
    text: "Learn web development on MDN!",
    // FIXME: add initialSearchParms to the url
    url: gameLinkURL,
  };

  async function share() {
    try {
      await navigator.share(shareData);
    } catch (error) {
      console.error("Error sharing:", error);

      toast.error("Failed to share", {
        description: "There was an error sharing the game. Please try again.",
      });
    }
  }

  function handleShare() {
    share();
  }

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-4">
        <Link href="/"> back</Link>Start a New Game
      </h1>
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
                defaultValue={
                  initialP1Name === "undefined" ? "" : initialP1Name
                }
                disabled={Boolean(initialP1Answer)}
              />

              <InputField
                label="Your Answer"
                name="p1Query"
                placeholder="VOID"
                required
                defaultValue={
                  initialP1Query === "undefined" ? "" : initialP1Query
                }
                disabled={Boolean(initialP1Answer)}
              />

              <input hidden name="id" value={id} readOnly />

              {!initialP1Answer && <Button type="submit">Submit</Button>}
            </Form>

            {initialP1Answer && (
              <div className="mt-4">
                <div className="text-green-600 mb-2">✓ Answer submitted</div>
                <Spotify link={initialP1Answer} />
              </div>
            )}
          </section>
          {!initialWinner && initialP1Answer && (
            <Form action={handleJudgeVote}>
              <input hidden name="id" value={id} readOnly />
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
                defaultValue={
                  initialP2Name === "undefined" ? "" : initialP2Name
                }
                disabled={Boolean(initialP2Answer)}
              />

              <InputField
                label="Your Answer"
                name="p2Query"
                placeholder="I am muic"
                required
                defaultValue={
                  initialP2Query === "undefined" ? "" : initialP2Query
                }
                disabled={Boolean(initialP2Answer)}
              />

              <input hidden name="id" value={id} readOnly />

              {!initialP2Answer && <Button type="submit">Submit</Button>}
            </Form>

            {initialP2Answer && (
              <div className="mt-4">
                <div className="text-green-600 mb-2">✓ Answer submitted</div>
                <Spotify link={initialP2Answer} />
              </div>
            )}
          </section>
          {!initialWinner && initialP2Answer && (
            <Form action={handleJudgeVote}>
              <input hidden name="id" value={id} readOnly />
              <input hidden name="vote" value="player2" readOnly />
              <input hidden name="judgeName" value="Judge" readOnly />
              <Button type="submit">Vote</Button>
            </Form>
          )}
        </div>
      </section>

      <section className="mt-8 border-t pt-8">
        {initialWinner && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">🏆 Winner 🏆</h2>
            <p className="text-xl">
              {initialWinner === "player1"
                ? initialP1Name || "Player 1"
                : initialP2Name || "Player 2"}{" "}
              has won the battle!
            </p>
          </div>
        )}
      </section>

      {!initialWinner && (
        <section className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Whose the Judge</h2>
          {!initialSearchParms.judgeName ? (
            <Form action={handleJudgeNameSubmit}>
              <InputField
                label="Judge Name"
                name="judgeName"
                placeholder="Enter your name"
                required
              />
              <input hidden name="id" value={id} readOnly />
              <Button type="submit">Submit Name</Button>
            </Form>
          ) : (
            <Form action={handleJudgeVote}>
              <div className="mb-4">
                <p className="text-lg">Judge: {initialSearchParms.judgeName}</p>
              </div>

              <input hidden name="id" value={id} readOnly />
              <input
                hidden
                name="judgeName"
                value={initialSearchParms.judgeName}
                readOnly
              />

              <Button type="submit">Submit Vote</Button>
            </Form>
          )}
        </section>
      )}
      <div className="flex justify-center gap-4 pt-16">
        <Button
          onClick={() => {
            handleShare();
          }}
        >
          Share Challenge
        </Button>
      </div>
    </div>
  );
}
