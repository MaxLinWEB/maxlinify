export type SourceType = 'sefon' | 'zaycev' | 'mp3party' | 'hitmotop' | 'ololo';

export interface SearchResult {
  id: string;
  title: string;
  artist: string;
  duration: number; // seconds
  coverUrl: string;
  source: SourceType;
}

export interface TrackStream {
  mp3Url: string;
  expiresAt: number; // unix timestamp
  source: string;
}

export interface LyricsResult {
  syncedLyrics: string | null;
  plainLyrics: string | null;
}

export interface LyricLine {
  timeMs: number;
  text: string;
}

export interface Playlist {
  id: string;
  name: string;
  tracks: StoredTrack[];
  createdAt: number;
  updatedAt: number;
}

export interface StoredTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
  source: SourceType;
  // NO mp3Url — fetch fresh on playback
}

export interface Scraper {
  search(query: string): Promise<SearchResult[]>;
  getStreamUrl(trackId: string): Promise<TrackStream>;
}

export interface HealthResponse {
  status: 'ok' | 'error';
  browsersReady: number;
}
