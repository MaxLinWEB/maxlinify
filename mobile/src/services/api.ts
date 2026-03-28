import type { SearchResult, TrackStream, LyricsResult } from '@maxlinify/shared';

// In development, use your machine's local IP
// Run `ipconfig` (Windows) or `ifconfig` (Mac/Linux) to find it
const BASE_URL = __DEV__
  ? 'http://localhost:3000/api'
  : 'http://YOUR_SERVER_IP:3000/api';

export const musicApi = {
  search: async (query: string, sources = 'all'): Promise<SearchResult[]> => {
    const res = await fetch(
      `${BASE_URL}/search?q=${encodeURIComponent(query)}&sources=${sources}`
    );
    if (!res.ok) throw new Error('Search failed');
    return res.json();
  },

  getStreamUrl: async (trackId: string, source: string): Promise<TrackStream> => {
    const res = await fetch(
      `${BASE_URL}/stream?id=${encodeURIComponent(trackId)}&source=${encodeURIComponent(source)}`
    );
    if (!res.ok) throw new Error('Failed to get stream URL');
    return res.json();
  },

  getLyrics: async (artist: string, title: string): Promise<LyricsResult> => {
    const res = await fetch(
      `${BASE_URL}/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`
    );
    if (!res.ok) throw new Error('Failed to get lyrics');
    return res.json();
  },

  checkHealth: async (): Promise<boolean> => {
    try {
      const res = await fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  },
};
