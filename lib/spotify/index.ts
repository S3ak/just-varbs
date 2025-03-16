// app/utils/spotify.ts
import { SpotifyTrack, SpotifyArtist, SpotifyAlbum } from "@types";

// Token management
let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;

async function getAccessToken(): Promise<string> {
  // If we have a valid token, return it
  if (accessToken && tokenExpiryTime && Date.now() < tokenExpiryTime) {
    return accessToken;
  }

  // Otherwise, request a new token
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${clientId}:${clientSecret}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  accessToken = data.access_token;
  tokenExpiryTime = Date.now() + data.expires_in * 900; // Set expiry with a small buffer

  return accessToken;
}

// Search for tracks
export async function searchTracks(query: string): Promise<SpotifyTrack[]> {
  const token = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.tracks.items;
}

// Search for artists
export async function searchArtists(query: string): Promise<SpotifyArtist[]> {
  const token = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=artist&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.artists.items;
}

// Search for albums
export async function searchAlbums(query: string): Promise<SpotifyAlbum[]> {
  const token = await getAccessToken();

  const response = await fetch(
    `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=album&limit=10`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();
  return data.albums.items;
}

// Get a track by ID
export async function getTrack(id: string): Promise<SpotifyTrack> {
  const token = await getAccessToken();

  const response = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

// Get an artist by ID
export async function getArtist(id: string): Promise<SpotifyArtist> {
  const token = await getAccessToken();

  const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

// Get an album by ID
export async function getAlbum(id: string): Promise<SpotifyAlbum> {
  const token = await getAccessToken();

  const response = await fetch(`https://api.spotify.com/v1/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}
