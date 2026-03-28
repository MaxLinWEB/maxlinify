import { Platform } from 'react-native';
import Constants from 'expo-constants';
import type { SearchResult, TrackStream, LyricsResult } from '@maxlinify/shared';

export class ApiError extends Error {
  status: number;
  isNetworkError: boolean;

  constructor(message: string, status = 0, isNetworkError = false) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.isNetworkError = isNetworkError;
  }
}

function getBaseUrl(): string {
  // 1. Check app config (set via eas.json env vars or app.json extra)
  const configUrl = Constants.expoConfig?.extra?.apiUrl;
  if (configUrl) return configUrl;

  // 2. Check environment variable (set in EAS build profiles)
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  // 3. Development fallback — use your computer's local IP for physical devices
  if (__DEV__) {
    // Physical device: use local network IP
    // Emulator: 10.0.2.2 maps to host localhost
    const LOCAL_IP = '192.168.0.101';
    return `http://${LOCAL_IP}:3000/api`;
  }

  // 4. Production — must be configured via env or app config
  console.warn('[API] No production API URL configured. Set EXPO_PUBLIC_API_URL or extra.apiUrl.');
  return 'http://192.168.0.101:3000/api';
}

const BASE_URL = getBaseUrl();

async function apiFetch<T>(url: string, timeoutMs = 10000): Promise<T> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(timeoutMs) });
    if (!res.ok) {
      throw new ApiError(`Request failed: ${res.statusText}`, res.status);
    }
    return res.json();
  } catch (err) {
    if (err instanceof ApiError) throw err;
    throw new ApiError(
      err instanceof Error ? err.message : 'Network error',
      0,
      true,
    );
  }
}

export const musicApi = {
  search: (query: string, sources = 'all'): Promise<SearchResult[]> =>
    apiFetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&sources=${sources}`),

  getStreamUrl: (trackId: string, source: string, skipCache = false): Promise<TrackStream> =>
    apiFetch(`${BASE_URL}/stream?id=${encodeURIComponent(trackId)}&source=${encodeURIComponent(source)}${skipCache ? '&skipCache=true' : ''}`),

  getLyrics: (artist: string, title: string): Promise<LyricsResult> =>
    apiFetch(`${BASE_URL}/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`),

  checkHealth: async (): Promise<boolean> => {
    try {
      const res = await fetch(`${BASE_URL}/health`, { signal: AbortSignal.timeout(3000) });
      return res.ok;
    } catch {
      return false;
    }
  },
};
