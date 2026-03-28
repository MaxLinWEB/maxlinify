import { create } from 'zustand';
import type { SearchResult } from '@maxlinify/shared';
import { audioService } from '../services/audioService';
import { musicApi } from '../services/api';

interface PlayerStore {
  // Current track
  currentTrack: SearchResult | null;
  isPlaying: boolean;
  position: number;   // ms
  duration: number;   // ms
  isLoading: boolean;
  error: string | null;

  // Queue
  queue: SearchResult[];
  queueIndex: number;

  // Actions
  play: (track: SearchResult) => Promise<void>;
  pause: () => void;
  resume: () => void;
  seek: (positionMs: number) => void;
  skipNext: () => void;
  skipPrevious: () => void;
  addToQueue: (track: SearchResult) => void;
  clearQueue: () => void;
  setQueue: (tracks: SearchResult[], startIndex: number) => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => {
  // Set up audio status callback
  audioService.setStatusCallback((status) => {
    if (!status.isLoaded) return;

    set({
      position: status.positionMillis || 0,
      duration: status.durationMillis || 0,
      isPlaying: status.isPlaying,
    });

    // Auto-skip to next track when current finishes
    if (status.didJustFinish) {
      get().skipNext();
    }
  });

  return {
    currentTrack: null,
    isPlaying: false,
    position: 0,
    duration: 0,
    isLoading: false,
    error: null,
    queue: [],
    queueIndex: -1,

    play: async (track) => {
      set({ currentTrack: track, isLoading: true, error: null });

      try {
        const stream = await musicApi.getStreamUrl(track.id, track.source);
        await audioService.loadAndPlay(stream.mp3Url);
        set({ isLoading: false, isPlaying: true });
      } catch (err) {
        // Retry once on failure (MP3 URL may have expired)
        try {
          const stream = await musicApi.getStreamUrl(track.id, track.source);
          await audioService.loadAndPlay(stream.mp3Url);
          set({ isLoading: false, isPlaying: true });
        } catch {
          set({
            isLoading: false,
            isPlaying: false,
            error: 'Could not load track',
          });
        }
      }
    },

    pause: () => {
      audioService.pause();
      set({ isPlaying: false });
    },

    resume: () => {
      audioService.resume();
      set({ isPlaying: true });
    },

    seek: (positionMs) => {
      audioService.seek(positionMs);
      set({ position: positionMs });
    },

    skipNext: () => {
      const { queue, queueIndex } = get();
      if (queueIndex < queue.length - 1) {
        const nextIndex = queueIndex + 1;
        set({ queueIndex: nextIndex });
        get().play(queue[nextIndex]);
      }
    },

    skipPrevious: () => {
      const { queue, queueIndex, position } = get();
      // If more than 3 seconds in, restart current track
      if (position > 3000 && get().currentTrack) {
        audioService.seek(0);
        set({ position: 0 });
        return;
      }
      if (queueIndex > 0) {
        const prevIndex = queueIndex - 1;
        set({ queueIndex: prevIndex });
        get().play(queue[prevIndex]);
      }
    },

    addToQueue: (track) => {
      set((state) => ({ queue: [...state.queue, track] }));
    },

    clearQueue: () => {
      set({ queue: [], queueIndex: -1 });
    },

    setQueue: (tracks, startIndex) => {
      set({ queue: tracks, queueIndex: startIndex });
      if (tracks[startIndex]) {
        get().play(tracks[startIndex]);
      }
    },
  };
});
