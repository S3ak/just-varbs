"use client";

import React from "react";
import Link from "next/link";
import Form from "next/form";
import { usePathname } from "next/navigation";
import { Spotify } from "react-spotify-embed";
import Button from "@/components/button";
import InputField from "@/components/input-field";
import useGameStore from "@/hooks/use-game";

import { onSubmitAnswerAction } from "@/app/match/[slug]/actions";

export default function Game({
  id = "string",
  initialP1Name = "",
  initialP1Query = "",
  initialP2Name = "",
  initialP2Query = "",
  initialP1Answer = "",
  initialP2Answer = "",
  initialSearchParms,
}) {
  const generateQuestion = useGameStore((state) => state.generateQuestion);

  // const [state, action, isPending] = useActionState(onSubmitAnswerAction);

  const question = generateQuestion();
  const onSubmitAnswerActionWithSearch = onSubmitAnswerAction.bind(
    null,
    initialSearchParms
  );

  const pathName = usePathname();

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
    // FIXME
    url: window.location.href,
  };

  async function share() {
    try {
      await navigator.share(shareData);
    } catch (error) {}
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
          <Button onClick={() => alert("voted")}>Vote</Button>
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
          <Button>Vote</Button>
        </div>
      </section>
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
