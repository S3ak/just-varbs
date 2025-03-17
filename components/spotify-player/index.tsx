"use client";

import React, { useEffect, useState } from "react";
import { Spotify } from "react-spotify-embed";
import { searchTracks } from "@/lib/spotify";
import { SpotifyTrack } from "@/lib/types";

export default function SpotifyPlayerWrapper({ defaultSearchTerm = "" }) {
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>(defaultSearchTerm);

  useEffect(() => {
    async function getsong() {
      if (searchTerm) {
        const track = await searchTracks(searchTerm);
        setSelectedTrack(track[0]);
      }
    }

    getsong();
  }, [searchTerm]);

  return (
    <section>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          setSearchTerm(formData.get("song") as string);
        }}
      >
        <input
          type="text"
          name="song"
          placeholder="Enter a song name"
          className="w-full px-4 py-2 rounded-full text-black"
        />
      </form>
      {selectedTrack?.external_urls && (
        <Spotify link={selectedTrack.external_urls.spotify} />
      )}
    </section>
  );
}
