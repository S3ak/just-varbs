"use server";

import { searchTracks } from "@/lib/spotify";
import { p1FormSchema } from "@/lib/game/formSchemas";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { addParamsToURL } from "@/lib/game/utils";

export async function getSong(query: string) {
  const tracks = await searchTracks(query);
  console.warn("tracks", tracks);
  return tracks[0]?.external_urls.spotify;
}

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  selectedSong?: string;
  form?: { [key: string]: FormDataEntryValue };
  id: string;
};

export async function onSubmitP1AnswerAction(
  _: FormState,
  data: FormData
): Promise<FormState> {
  console.warn("submitting");
  const formData = Object.fromEntries(data);
  const parsed = p1FormSchema.safeParse(formData);
  let selectedSong = "";
  const id = formData.id as string;
  const p1Query = formData.p1Query as string;

  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const key of Object.keys(formData)) {
      fields[key] = formData[key].toString();
    }

    return {
      message: "Invalid form data",
      fields,
      issues: parsed.error.issues.map((issue) => issue.message),
      id,
    };
  }

  try {
    selectedSong = await getSong(p1Query);

    return {
      message: "User successfully submited answer",
      selectedSong,
      form: formData,
      id,
    };
  } catch (error: unknown) {
    return {
      message:
        "Something went wrong on the server: " + (error as Error)?.message,
      id,
    };
  }
}

export async function onSubmitAnswerAction(
  initialSearchParams: Record<string, string>,
  data: FormData
) {
  const {
    id,
    p1Name = initialSearchParams.p1Name,
    p1Query = initialSearchParams.p1Query,
    p2Name = initialSearchParams.p2Name,
    p2Query = initialSearchParams.p2Query,
  } = Object.fromEntries(data);

  const newP1Name = !p1Name ? "" : (p1Name as string);
  const newP1Query = !p1Query ? "" : (p1Query as string);
  const newP2Name = !p2Name ? "" : (p2Name as string);
  const newP2Query = !p2Query ? "" : (p2Query as string);

  console.warn("initialSearchParams --->", initialSearchParams);

  const newSearchParams = {
    ...initialSearchParams,
    p1Name: newP1Name,
    p1Query: newP1Query,
    p2Name: newP2Name,
    p2Query: newP2Query,
  };

  revalidatePath(`/match/${id}`);
  redirect(addParamsToURL(newSearchParams, id as string));
}

export async function onJudgeVote(
  initialSearchParams: Record<string, string>,
  data: FormData
) {
  const { id, judgeName = "Random Judge", vote } = Object.fromEntries(data);

  console.warn("initialSearchParams --->", initialSearchParams);

  const newSearchParams = {
    ...initialSearchParams,
    judgeName: judgeName as string,
    vote: vote as string,
  };

  revalidatePath(`/match/${id}`);
  redirect(addParamsToURL(newSearchParams, id as string));
}

export async function onJudgeNameSubmit(
  initialSearchParams: Record<string, string>,
  data: FormData
) {
  const { id, judgeName } = Object.fromEntries(data);

  const newSearchParams = {
    ...initialSearchParams,
    judgeName: judgeName as string,
  };

  revalidatePath(`/match/${id}`);
  redirect(addParamsToURL(newSearchParams, id as string));
}
