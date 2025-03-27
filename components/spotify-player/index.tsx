"use client";

import React, { useEffect, useState } from "react";
import { Spotify } from "react-spotify-embed";
import { useDebounceValue } from "usehooks-ts";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { searchTracks } from "@/lib/spotify";
import { SpotifyTrack } from "@/lib/types";
import InputField from "@/components/input-field";

const searchSchema = z.object({
  song: z.string().min(1, "Please enter a song name")
});

type SearchFormData = z.infer<typeof searchSchema>;

/**
 * A client-side wrapper component for the Spotify player
 * @component
 * @param {string} defaultSearchTerm - Default search term for the player. You can narrow down your search using field filters. The available filters are album, artist, track, year, upc, tag:hipster, tag:new, isrc, and genre. Each field filter only applies to certain result types.
  * The artist and year filters can be used while searching albums, artists and tracks. You can filter on a single year or a range (e.g. 1955-1960).
  * The album filter can be used while searching albums and tracks.
  * The genre filter can be used while searching artists and tracks.
  * The isrc and track filters can be used while searching tracks.
  * The upc, tag:new and tag:hipster filters can only be used while searching albums. The tag:new filter will return albums released in the past two weeks and tag:hipster can be used to return only albums with the lowest 10% popularity.
 * 
 * @description
 * Provides a search interface and embedded Spotify player functionality.
 * Features include:
 * - Debounced search input (500ms delay)
 * - Automatic track search and selection
 * - Embedded Spotify player
 * - Real-time track updates
 * - Form validation using react-hook-form and zod
 * 
 * @example
 * ```tsx
 * <SpotifyPlayerWrapper defaultSearchTerm="Bohemian Rhapsody" />
 * ```
 */
export default function SpotifyPlayerWrapper({ defaultSearchTerm = "" }) {
  const [selectedTrack, setSelectedTrack] = useState<SpotifyTrack | null>(null);
  const [debouncedValue, setValue] = useDebounceValue(defaultSearchTerm, 500);

  const { register, handleSubmit, watch } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      song: defaultSearchTerm
    }
  });

  useEffect(() => {
    const subscription = watch((value) => {
      if (value.song) {
        setValue(value.song);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [watch, setValue]);

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
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <InputField
          type="text"
          {...register("song")}
          placeholder="Enter a song name"
        />
      </form>
      {selectedTrack?.external_urls && (
        <Spotify link={selectedTrack.external_urls.spotify} />
      )}
    </section>
  );
}
