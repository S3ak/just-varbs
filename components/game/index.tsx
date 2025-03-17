"use client";

import { Spotify } from "react-spotify-embed";
import Link from "next/link";
import { z } from "zod";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "@/components/button";
import useGameStore from "@/hooks/use-game";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { p1FormSchema, p2FormSchema } from "@/lib/game/formSchemas";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export default function Game({
  id = "string",
  initialP1Answer = "",
  initialP2Answer = "",
  initialSearchParams,
}) {
  // const params = useParams<{ tag: string; item: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const generateQuestion = useGameStore((state) => state.generateQuestion);
  const [p1Answer] = useState(initialP1Answer);
  const [p2Answer] = useState(initialP2Answer);

  const question = generateQuestion();

  const p1form = useForm<z.output<typeof p1FormSchema>>({
    resolver: zodResolver(p1FormSchema),
    defaultValues: {
      p1Query: searchParams.get("p1Query") ?? "",
      p1Name: searchParams.get("p1Name") ?? "",
    },
  });

  const p2form = useForm<z.output<typeof p2FormSchema>>({
    resolver: zodResolver(p2FormSchema),
    defaultValues: {
      p2Query: searchParams.get("p2Query") ?? "",
      p2Name: searchParams.get("p2Name") ?? "",
    },
  });

  const onSubmit = async (data, e) => {
    console.log("submitting", data);
    e.preventDefault();

    const params = {
      ...initialSearchParams,
      p1Name: data.p1Name,
      p1Query: data.p1Query,
    };

    const searchParams = new URLSearchParams(Object.entries(params));
    const url = `/match/${id}?${encodeURIComponent(searchParams.toString())}`;
    router.replace(url);
  };

  const onSubmit2 = async (data, e) => {
    console.log("submitting", data);
    e.preventDefault();

    const params = {
      ...initialSearchParams,
      p1Name: data.p1Name,
      p1Query: data.p1Query,
    };

    const searchParams = new URLSearchParams(Object.entries(params));
    const url = `/match/${id}?${encodeURIComponent(searchParams.toString())}`;
    router.replace(url);
  };

  console.log("initialSearchParams", initialSearchParams);

  return (
    <div className="max-w-7xl mx-auto text-center">
      <h1 className="text-5xl font-bold mb-4">
        <Link href="/"> back</Link>Start a New Game
      </h1>
      <p className="text-xl mb-8">{question}</p>
      <section className="flex justify-center gap-4">
        <div className="flex flex-col" role="column">
          <h2>Player 1</h2>
          <section>
            <Form {...p1form}>
              <form
                onSubmit={p1form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={p1form.control}
                  name="p1Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player 1 Name:</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={p1form.control}
                  name="p1Query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer:</FormLabel>
                      <FormControl>
                        <Input placeholder="Purple Rain" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please select your answer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button hidden type="submit">
                  Submit
                </Button>
              </form>
            </Form>

            {p1Answer && <Spotify link={p1Answer} />}
          </section>
          <Button>Vote</Button>
        </div>

        <div className="flex flex-col" role="column">
          <h2>Player 2</h2>
          <section>
            <Form {...p2form}>
              <form
                onSubmit={p2form.handleSubmit(onSubmit2)}
                className="space-y-8"
              >
                <FormField
                  control={p2form.control}
                  name="p2Name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name:</FormLabel>
                      <FormControl>
                        <Input placeholder="Your Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={p2form.control}
                  name="p2Query"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Answer:</FormLabel>
                      <FormControl>
                        <Input placeholder="Purple Rain" {...field} />
                      </FormControl>
                      <FormDescription>
                        Please select your answer
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button hidden type="submit">
                  Submit
                </Button>
              </form>
            </Form>

            {p2Answer && <Spotify link={p2Answer} />}
          </section>
          <Button>Vote</Button>
        </div>
      </section>
      <div className="flex justify-center gap-4"></div>
    </div>
  );
}
