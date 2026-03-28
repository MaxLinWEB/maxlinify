import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SearchResult } from '@maxlinify/shared';
import { audioService } from '../services/audioService';
import { musicApi } from '../services/api';

type RepeatMode = 'off' | 'all' | 'one';

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

  // Shuffle & Repeat
  shuffleEnabled: boolean;
  repeatMode: RepeatMode;
  originalQueue: SearchResult[];

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
  toggleShuffle: () => void;
  cycleRepeatMode: () => void;
}

function shuffleArray<T>(arr: T[], keepIndex: number): T[] {
  const result = [...arr];
  const kept = result.splice(keepIndex, 1)[0];
  // Fisher-Yates
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return [kept, ...result];
}

export const usePlayerStore = create<PlayerStore>()(
  persist(
    (set, get) => {
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
          const { repeatMode } = get();
          if (repeatMode === 'one') {
            audioService.seek(0);
            audioService.resume();
            set({ position: 0 });
          } else {
            get().skipNext();
          }
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
        shuffleEnabled: false,
        repeatMode: 'off',
        originalQueue: [],

        play: async (track) => {
          set({ currentTrack: track, isLoading: true, error: null });

          try {
            const stream = await musicApi.getStreamUrl(track.id, track.source);
            await audioService.loadAndPlay(stream.mp3Url);
            set({ isLoading: false, isPlaying: true });
          } catch (err) {
            // Retry with skipCache to bypass stale cached URLs
            try {
              const stream = await musicApi.getStreamUrl(track.id, track.source, true);
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
          const { queue, queueIndex, repeatMode } = get();
          if (queueIndex < queue.length - 1) {
            const nextIndex = queueIndex + 1;
            set({ queueIndex: nextIndex });
            get().play(queue[nextIndex]);
          } else if (repeatMode === 'all' && queue.length > 0) {
            set({ queueIndex: 0 });
            get().play(queue[0]);
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
          } else if (get().repeatMode === 'all' && queue.length > 0) {
            const lastIndex = queue.length - 1;
            set({ queueIndex: lastIndex });
            get().play(queue[lastIndex]);
          }
        },

        addToQueue: (track) => {
          set((state) => ({
            queue: [...state.queue, track],
            originalQueue: state.shuffleEnabled
              ? [...state.originalQueue, track]
              : [...state.queue, track],
          }));
        },

        clearQueue: () => {
          set({ queue: [], queueIndex: -1, originalQueue: [] });
        },

        setQueue: (tracks, startIndex) => {
          const { shuffleEnabled } = get();
          if (shuffleEnabled) {
            const shuffled = shuffleArray(tracks, startIndex);
            set({ queue: shuffled, queueIndex: 0, originalQueue: tracks });
            if (shuffled[0]) get().play(shuffled[0]);
          } else {
            set({ queue: tracks, queueIndex: startIndex, originalQueue: tracks });
            if (tracks[startIndex]) get().play(tracks[startIndex]);
          }
        },

        toggleShuffle: () => {
          const { shuffleEnabled, queue, queueIndex, originalQueue, currentTrack } = get();
          if (shuffleEnabled) {
            // Disable shuffle — restore original order
            const src = originalQueue.length ? originalQueue : queue;
            const newIndex = currentTrack ? src.findIndex((t) => t.id === currentTrack.id) : 0;
            set({
              shuffleEnabled: false,
              queue: src,
              queueIndex: Math.max(newIndex, 0),
            });
          } else {
            // Enable shuffle
            if (queue.length > 1 && queueIndex >= 0) {
              const shuffled = shuffleArray(queue, queueIndex);
              set({
                shuffleEnabled: true,
                originalQueue: queue,
                queue: shuffled,
                queueIndex: 0,
              });
            } else {
              set({ shuffleEnabled: true, originalQueue: queue });
            }
          }
        },

        cycleRepeatMode: () => {
          const modes: RepeatMode[] = ['off', 'all', 'one'];
          const current = get().repeatMode;
          const nextIdx = (modes.indexOf(current) + 1) % modes.length;
          set({ repeatMode: modes[nextIdx] });
        },
      };
    },
    {
      name: 'maxlinify-player',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        queue: state.queue,
        queueIndex: state.queueIndex,
        currentTrack: state.currentTrack,
        shuffleEnabled: state.shuffleEnabled,
        repeatMode: state.repeatMode,
        originalQueue: state.originalQueue,
      }),
    },
  ),
);
