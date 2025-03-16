export interface User {
  id: string;
  email: string | null;
  alias: string;
  spotify_id: string | null;
  created_at: string;
  updated_at: string;
}

export type PlayerRank = "NPC" | "Street Pharmacist";

export interface Player {
  id: string;
  user_id: string;
  rank: PlayerRank;
  created_at: string;
  updated_at: string;
}

export interface Match {
  id: string;
  winner_id: string | null;
  judge_id: string;
  created_at: string;
  completed_at: string | null;
  is_completed: boolean;
}

export interface Round {
  id: string;
  match_id: string;
  category: string;
  genre: string | null;
  tags: string[];
  question: string;
  winner_id: string | null;
  current_turn: number;
  total_turns: number;
  is_completed: boolean;
  datetime_start: string;
  datetime_end: string;
  answer1: string | null;
  answer2: string | null;
  created_at: string;
}

export interface Competitor {
  id: string;
  match_id: string;
  player_id: string;
  score: number;
  turn: number;
  created_at: string;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  album: {
    id: string;
    name: string;
    images: Array<{ url: string; height: number; width: number }>;
  };
  external_urls: {
    spotify: string;
  };
}

export interface SpotifyArtist {
  id: string;
  name: string;
  images: Array<{ url: string; height: number; width: number }>;
  genres: string[];
}

export interface SpotifyAlbum {
  id: string;
  name: string;
  artists: Array<{ id: string; name: string }>;
  images: Array<{ url: string; height: number; width: number }>;
  release_date: string;
}
