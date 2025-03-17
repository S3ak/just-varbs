"use client";

import useSpotify from "@/hooks/use-spotify";
import { Spotify } from "react-spotify-embed";

const defaultState = {
  medium: "spotify",
  links: [{ label: "Sound Cloud", icon: "", url: "/#TODO_Soundcloud" }],
  spotifyLink: "https://open.spotify.com/playlist/4ywcwKa4EsNPXEE3FeuWk4",
};

export default function DJSeakStream({ initialState = defaultState }) {
  const spotify = useSpotify(initialState.spotifyLink);

  const link = initialState.spotifyLink;

  console.log("link", initialState);

  if (!link) {
    return null;
  }

  return (
    <div>
      <Spotify link={link} />
    </div>
  );
}
