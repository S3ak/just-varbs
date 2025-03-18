"use client";

import React from "react";
import Link from "next/link";
import Form from "next/form";
import { Spotify } from "react-spotify-embed";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import useGameStore from "@/hooks/use-game";
import { toast } from "sonner";

import { onSubmitAnswerAction, onJudgeVote } from "@/app/match/[slug]/actions";
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
  // TODO: Easier share code
  // const gameCode = "123456";
  const baseURL = getBaseURL();
  const gameLinkURL = `${baseURL}${pathName}?${addParamsToURL(initialSearchParms, id)}`;

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
              />

              <InputField
                label="Your Answer"
                name="p1Query"
                placeholder="VOID"
                required
                defaultValue={
                  initialP1Query === "undefined" ? "" : initialP1Query
                }
              />

              <input hidden name="id" value={id} readOnly />

              <Button hidden type="submit">
                Submit
              </Button>
            </Form>

            {initialP1Answer && <Spotify link={initialP1Answer} />}
          </section>
          <Form action={handleJudgeVote}>
            <input hidden name="id" value={id} readOnly />
            <input hidden name="vote" value="player1" readOnly />
            <input hidden name="judgeName" value="Judge" readOnly />
            <Button type="submit">Vote</Button>
          </Form>
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
              />

              <InputField
                label="Your Answer"
                name="p2Query"
                placeholder="I am muic"
                required
                defaultValue={
                  initialP2Query === "undefined" ? "" : initialP2Query
                }
              />

              <input hidden name="id" value={id} readOnly />

              <Button hidden type="submit">
                Submit
              </Button>
            </Form>

            {Boolean(initialP2Answer) && <Spotify link={initialP2Answer} />}
          </section>
          <Form action={handleJudgeVote}>
            <input hidden name="id" value={id} readOnly />
            <input hidden name="vote" value="player2" readOnly />
            <input hidden name="judgeName" value="Judge" readOnly />
            <Button type="submit">Vote</Button>
          </Form>
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
          <h2 className="text-2xl font-bold mb-4">Judge&apos;s Vote</h2>
          <Form action={handleJudgeVote}>
            <InputField
              label="Judge Name"
              name="judgeName"
              placeholder="Enter your name"
              required
            />

            <div className="flex flex-col gap-4 mt-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="voteP1"
                  name="vote"
                  value="player1"
                  required
                />
                <label htmlFor="voteP1">
                  Vote for {initialP1Name || "Player 1"}
                </label>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="voteP2"
                  name="vote"
                  value="player2"
                  required
                />
                <label htmlFor="voteP2">
                  Vote for {initialP2Name || "Player 2"}
                </label>
              </div>
            </div>

            <input hidden name="id" value={id} readOnly />

            <Button type="submit">Submit Vote</Button>
          </Form>
        </section>
      )}
      <div className="flex justify-center gap-4">
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

function addParamsToURL(data: Record<string, string>, id: string) {
  const searchParams = new URLSearchParams(Object.entries(data));

  return `/match/${id}?${encodeURIComponent(searchParams.toString())}`;
}
