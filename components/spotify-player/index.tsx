"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Spotify } from "react-spotify-embed";
import { searchTracks } from "@lib/spotify";
import { SpotifyTrack } from "@/lib/types";

function debounce(func: Function, wait: number) {
  let timeout: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

export default function SpotifyPlayerWrapper() {
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const debouncedSearch = useCallback(
    debounce((term: string) => setSearchTerm(term), 500),
    []
  );

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
          debouncedSearch(formData.get("song") as string);
        }}
      >
        <input
          type="text"
          name="song"
          placeholder="Enter a song name"
          className="w-full px-4 py-2 rounded-full text-black"
          onChange={(e) => debouncedSearch(e.target.value)}
        />
      </form>
      {selectedTrack?.external_urls && (
        <Spotify link={selectedTrack.external_urls.spotify} />
      )}
    </section>
  );
}
