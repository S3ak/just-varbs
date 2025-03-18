import { SpotifyTrack, SpotifyArtist, SpotifyAlbum } from "@types";

const SPOTIFY_API_URL = "https://api.spotify.com/v1";

// Token management
let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;

async function getAccessToken(): Promise<string | null> {
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
    body: new URLSearchParams({
      grant_type: "client_credentials",
    }),
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
    `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=track&limit=10`,
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
    `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=artist&limit=10`,
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
    `${SPOTIFY_API_URL}/search?q=${encodeURIComponent(query)}&type=album&limit=10`,
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

  const response = await fetch(`${SPOTIFY_API_URL}/tracks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

// Get an artist by ID
export async function getArtist(id: string): Promise<SpotifyArtist> {
  const token = await getAccessToken();

  const response = await fetch(`${SPOTIFY_API_URL}/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

// Get an album by ID
export async function getAlbum(id: string): Promise<SpotifyAlbum> {
  const token = await getAccessToken();

  const response = await fetch(`${SPOTIFY_API_URL}/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
}

// Get users current playback state
export async function userPlayback() {
  const token = await getAccessToken();

  const response = await fetch(`${SPOTIFY_API_URL}/me/player`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  return data;
}

// Get users current playback state
export async function userCurrentSong() {
  const token = await getAccessToken();

  console.warn("TOKEN ---- >>>>", token);

  const response = await fetch(
    `${SPOTIFY_API_URL}/me/player/currently-playing`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await response.json();

  console.warn("Current track ---- >>>>", data);

  return data;
}

export async function getUserProfile(userId = "seakdigital") {
  const token = await getAccessToken();

  const response = await fetch(`${SPOTIFY_API_URL}/users/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.warn("User Profile ---- >>>>", data);

  return data;
}

export async function getUserTopItems(
  type = "tracks",
  timeRange = "medium_term",
  limit = 5,
  offset = 0
) {
  const token = await getAccessToken();

  const response = await fetch(`${SPOTIFY_API_URL}/me/top/${type}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.warn("User Profile ---- >>>>", data);

  return data;
}

export async function getUsersPlaylist(userId = "seakdigital") {
  const token = await getAccessToken();

  const response = await fetch(`${SPOTIFY_API_URL}/users/${userId}/playlists`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  console.warn("User Playlists ---- >>>>", data);

  return data;
}

export async function getSeakCurrentSong() {
  const playback = await userCurrentSong();
  return playback?.item.external_urls.spotify;
}

export async function getSeakCurrentTrackDetails() {
  const playback = await userCurrentSong();
  return playback?.item;
}
