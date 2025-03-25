"use server";

import { redirect } from "next/navigation";
import { searchTracks } from "@/lib/spotify";
import { addParamsToURL } from "@/lib/game/utils";

export async function getSong(query: string) {
  try {
    if (!query) {
      console.error("Empty query provided to getSong");
      return "";
    }

    const tracks = await searchTracks(query);
    if (!tracks || tracks.length === 0) {
      console.error("No tracks found for query:", query);
      return "";
    }

    const track = tracks[0];
    if (!track.external_urls?.spotify) {
      console.error("Track found but no Spotify URL available:", track);
      return "";
    }

    return track.external_urls.spotify;
  } catch (error) {
    console.error("Error searching for song:", error);
    return "";
  }
}

export type FormState = {
  message: string;
  fields?: Record<string, string>;
  issues?: string[];
  selectedSong?: string;
  form?: { [key: string]: FormDataEntryValue };
  id: string;
};

export async function onSubmitPlayerAnswerAction(formData: FormData) {
  try {
    const id = formData.get("id") as string;
    const playerNumber = formData.get("playerNumber") as string;
    const playerName = formData.get(`player${playerNumber}Name`) as string;
    const playerInstagram = formData.get(
      `player${playerNumber}Instagram`
    ) as string;
    const playerQuery = formData.get(`player${playerNumber}Query`) as string;
    const currentUrlStr = formData.get("currentUrl") as string;
    console.log("currentUrlStr ----->", currentUrlStr);

    if (!id || !playerNumber || !playerName || !playerQuery) {
      console.error("Invalid form data");
      return;
    }

    const selectedSong = await getSong(playerQuery);
    if (!selectedSong) {
      console.error("No song found");
      return;
    }

    // Get the current URL and parse its search params
    if (!currentUrlStr) {
      console.error("No current URL provided");
      return;
    }

    let currentParams = {};
    try {
      // Extract search params from the relative URL
      const searchParams = new URLSearchParams(currentUrlStr.split("?")[1]);
      currentParams = Object.fromEntries(searchParams);
    } catch (error) {
      console.error("Error parsing current URL:", error);
      // If URL parsing fails, use empty params
      currentParams = {};
    }

    console.log("currentParams", currentParams);

    // Create new params object with existing params
    const newParams = {
      ...currentParams,
      [`player${playerNumber}Name`]: playerName,
      [`player${playerNumber}Instagram`]: playerInstagram,
      [`player${playerNumber}Query`]: playerQuery,
    };

    // Create the new URL with all params
    const newUrl = addParamsToURL(newParams, id);

    // Redirect to the new URL
    redirect(newUrl);
  } catch (error) {
    console.error("Error submitting answer:", error);
    // Re-throw the error to be handled by the form
    throw error;
  }
}

export async function onJudgeNameSubmit(
  search: Record<string, string>,
  formData: FormData
) {
  try {
    const id = formData.get("id") as string;
    const judgeName = formData.get("judgeName") as string;
    const currentUrlStr = formData.get("currentUrl") as string;

    if (!id || !judgeName) {
      console.error("Invalid form data");
      return;
    }

    // Get the current URL and parse its search params
    if (!currentUrlStr) {
      console.error("No current URL provided");
      return;
    }

    let currentParams = {};
    try {
      // Extract search params from the relative URL
      const searchParams = new URLSearchParams(currentUrlStr.split("?")[1]);
      currentParams = Object.fromEntries(searchParams);
    } catch (error) {
      console.error("Error parsing current URL:", error);
      // If URL parsing fails, use empty params
      currentParams = {};
    }

    // Create new params object with existing params
    const newParams = {
      ...currentParams,
      judgeName,
    };

    // Create the new URL with all params
    const newUrl = addParamsToURL(newParams, id);

    // Redirect to the new URL
    redirect(newUrl);
  } catch (error) {
    console.error("Error submitting judge name:", error);
  }
}

export async function onJudgeVote(
  search: Record<string, string>,
  formData: FormData
) {
  try {
    const id = formData.get("id") as string;
    const vote = formData.get("vote") as string;
    const judgeName = formData.get("judgeName") as string;

    if (!id || !vote || !judgeName) {
      console.error("Invalid form data");
      return;
    }

    // Create new params object with existing params
    const newParams = {
      ...search,
      vote,
      judgeName,
    };

    // Create the new URL with all params
    const newUrl = addParamsToURL(newParams, id);

    // Redirect to the new URL
    redirect(newUrl);
  } catch (error) {
    console.error("Error submitting vote:", error);
  }
}
