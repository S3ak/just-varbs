"use client";

import React, { useEffect, useState } from "react";
import { Spotify } from "react-spotify-embed";
import { useDebounceValue } from "usehooks-ts";

import { searchTracks } from "@/lib/spotify";
import { SpotifyTrack } from "@/lib/types";
import InputField from "@/components/input-field";

export default function SpotifyPlayerWrapper({ defaultSearchTerm = "" }) {
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [debouncedValue, setValue] = useDebounceValue(defaultSearchTerm, 500);

  useEffect(() => {
    async function getsong(val = "") {
      if (debouncedValue) {
        const track = await searchTracks(val);
        setSelectedTrack(track[0]);
      }
    }

    getsong(debouncedValue);
  }, [debouncedValue]);

  return (
    <section>
      <form>
        <InputField
          type="text"
          name="song"
          placeholder="Enter a song name"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setValue(e.target.value)
          }
        />
      </form>
      {selectedTrack?.external_urls && (
        <Spotify link={selectedTrack.external_urls.spotify} />
      )}
    </section>
  );
}
