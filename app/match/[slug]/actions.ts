"use server";

import { searchTracks } from "@/lib/spotify";
import { p1FormSchema } from "@/lib/game/formSchemas";

export async function getSong(query: string) {
  console.log("query is ---->", query);
  const tracks = await searchTracks(query);
  return tracks[0].external_urls.spotify;
}

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  selectedSong?: string;
  form?: any;
  id: string;
};

export async function onSubmitP1AnswerAction(
  prevState: FormState,
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
  } catch (error) {
    return {
      message: "Something went wrong on the server: " + error?.message,
      id,
    };
  }
}
