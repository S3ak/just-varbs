"use client";

import { Spotify } from "react-spotify-embed";

const defaultState = {
  medium: "spotify",
  links: [{ label: "Sound Cloud", icon: "", url: "/#TODO_Soundcloud" }],
  spotifyLink: "https://open.spotify.com/playlist/4ywcwKa4EsNPXEE3FeuWk4",
};

export default function DJSeakStream({ initialState = defaultState }) {
  const link = initialState.spotifyLink;

  if (!link) {
    return null;
  }

  return (
    <div className="flex flex-col gap-6 rounded-xl py-6 shadow-sm items-center">
      <Spotify link={link} />
    </div>
  );
}
