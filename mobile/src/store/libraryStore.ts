import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { SearchResult, Playlist, StoredTrack } from '@maxlinify/shared';

function toStoredTrack(track: SearchResult): StoredTrack {
  return {
    id: track.id,
    title: track.title,
    artist: track.artist,
    duration: track.duration,
    coverUrl: track.coverUrl,
    source: track.source,
  };
}

interface LibraryStore {
  favorites: StoredTrack[];
  playlists: Playlist[];

  addFavorite: (track: SearchResult) => void;
  removeFavorite: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;

  createPlaylist: (name: string) => Playlist;
  deletePlaylist: (playlistId: string) => void;
  addToPlaylist: (playlistId: string, track: SearchResult) => void;
  removeFromPlaylist: (playlistId: string, trackId: string) => void;
  renamePlaylist: (playlistId: string, name: string) => void;
}

export const useLibraryStore = create<LibraryStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      playlists: [],

      addFavorite: (track) => {
        const stored = toStoredTrack(track);
        set((state) => {
          if (state.favorites.some((f) => f.id === stored.id)) return state;
          return { favorites: [stored, ...state.favorites] };
        });
      },

      removeFavorite: (trackId) => {
        set((state) => ({
          favorites: state.favorites.filter((f) => f.id !== trackId),
        }));
      },

      isFavorite: (trackId) => {
        return get().favorites.some((f) => f.id === trackId);
      },

      createPlaylist: (name) => {
        const playlist: Playlist = {
          id: `pl-${Date.now()}`,
          name,
          tracks: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        set((state) => ({ playlists: [...state.playlists, playlist] }));
        return playlist;
      },

      deletePlaylist: (playlistId) => {
        set((state) => ({
          playlists: state.playlists.filter((p) => p.id !== playlistId),
        }));
      },

      addToPlaylist: (playlistId, track) => {
        const stored = toStoredTrack(track);
        set((state) => ({
          playlists: state.playlists.map((p) => {
            if (p.id !== playlistId) return p;
            if (p.tracks.some((t) => t.id === stored.id)) return p;
            return {
              ...p,
              tracks: [...p.tracks, stored],
              updatedAt: Date.now(),
            };
          }),
        }));
      },

      removeFromPlaylist: (playlistId, trackId) => {
        set((state) => ({
          playlists: state.playlists.map((p) => {
            if (p.id !== playlistId) return p;
            return {
              ...p,
              tracks: p.tracks.filter((t) => t.id !== trackId),
              updatedAt: Date.now(),
            };
          }),
        }));
      },

      renamePlaylist: (playlistId, name) => {
        set((state) => ({
          playlists: state.playlists.map((p) => {
            if (p.id !== playlistId) return p;
            return { ...p, name, updatedAt: Date.now() };
          }),
        }));
      },
    }),
    {
      name: 'maxlinify-library',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
