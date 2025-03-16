// app/components/search-music.tsx
import React, { useState, useEffect } from "react";
import { BsSearch } from "react-icons/bs";
import { searchTracks, searchArtists } from "@/utils/spotify";
import { SpotifyTrack, SpotifyArtist } from "../types";
import { Button } from "./button";
import { Card, CardContent } from "./card";
import MusicPlayer from "./music-player";
import { useAutoAnimate } from "@formkit/auto-animate/react";

interface SearchMusicProps {
  onSelect: (item: {
    id: string;
    name: string;
    artist: string;
    image: string;
    previewUrl?: string;
  }) => void;
  type: "track" | "artist";
}

const SearchMusic: React.FC<SearchMusicProps> = ({ onSelect, type }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<(SpotifyTrack | SpotifyArtist)[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedItem, setSelectedItem] = useState<
    SpotifyTrack | SpotifyArtist | null
  >(null);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.length > 2) {
        search();
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const search = async () => {
    setIsLoading(true);
    try {
      if (type === "track") {
        const tracks = await searchTracks(query);
        setResults(tracks);
      } else {
        const artists = await searchArtists(query);
        setResults(artists);
      }
    } catch (error) {
      console.error("Error searching:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (item: SpotifyTrack | SpotifyArtist) => {
    setSelectedItem(item);

    if ("preview_url" in item) {
      // It's a track
      onSelect({
        id: item.id,
        name: item.name,
        artist: item.artists[0].name,
        image: item.album.images[0]?.url || "",
        previewUrl: item.preview_url || "",
      });
    } else {
      // It's an artist
      onSelect({
        id: item.id,
        name: item.name,
        artist: item.name,
        image: item.images[0]?.url || "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="relative">
        <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder={`Search for ${type === "track" ? "songs" : "artists"}...`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 bg-gray-900 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-green-500"></div>
        </div>
      )}

      <div ref={parent} className="space-y-2">
        {results.map((item) => {
          if (type === "track" && "preview_url" in item) {
            const track = item as SpotifyTrack;
            return (
              <Card
                key={track.id}
                onClick={() => handleSelect(track)}
                className={`cursor-pointer transition-colors hover:bg-gray-900 ${selectedItem?.id === track.id ? "border-green-500" : ""}`}
              >
                <CardContent className="p-3 flex items-center">
                  <img
                    src={track.album.images[0]?.url || "/placeholder.png"}
                    alt={track.name}
                    className="w-12 h-12 rounded-md mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-white truncate">
                      {track.name}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">
                      {track.artists.map((a) => a.name).join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          } else if (type === "artist" && "images" in item) {
            const artist = item as SpotifyArtist;
            return (
              <Card
                key={artist.id}
                onClick={() => handleSelect(artist)}
                className={`cursor-pointer transition-colors hover:bg-gray-900 ${selectedItem?.id === artist.id ? "border-green-500" : ""}`}
              >
                <CardContent className="p-3 flex items-center">
                  <img
                    src={artist.images[0]?.url || "/placeholder.png"}
                    alt={artist.name}
                    className="w-12 h-12 rounded-md mr-3"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-white truncate">
                      {artist.name}
                    </h4>
                    <p className="text-sm text-gray-400 truncate">
                      {artist.genres.slice(0, 2).join(", ")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          }
          return null;
        })}
      </div>

      {selectedItem &&
        "preview_url" in selectedItem &&
        selectedItem.preview_url && (
          <MusicPlayer
            previewUrl={selectedItem.preview_url}
            albumArt={selectedItem.album.images[0]?.url || ""}
            trackName={selectedItem.name}
            artistName={selectedItem.artists[0].name}
            className="mt-4"
          />
        )}

      <Button
        onClick={() =>
          onSelect(
            selectedItem
              ? {
                  id: selectedItem.id,
                  name: selectedItem.name,
                  artist:
                    "artists" in selectedItem
                      ? selectedItem.artists[0].name
                      : selectedItem.name,
                  image:
                    "album" in selectedItem
                      ? selectedItem.album.images[0]?.url
                      : selectedItem.images[0]?.url || "",
                  previewUrl:
                    "preview_url" in selectedItem
                      ? selectedItem.preview_url
                      : undefined,
                }
              : {
                  id: "",
                  name: "",
                  artist: "",
                  image: "",
                }
          )
        }
        disabled={!selectedItem}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        Select {type === "track" ? "Track" : "Artist"}
      </Button>
    </div>
  );
};

export default SearchMusic;
