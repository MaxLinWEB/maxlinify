import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface RecentSearch {
  query: string;
  timestamp: number;
}

interface SearchStore {
  recentSearches: RecentSearch[];
  addRecentSearch: (query: string) => void;
  removeRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;
}

const MAX_RECENT = 20;

export const useSearchStore = create<SearchStore>()(
  persist(
    (set) => ({
      recentSearches: [],

      addRecentSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        set((state) => {
          const filtered = state.recentSearches.filter(
            (s) => s.query.toLowerCase() !== trimmed.toLowerCase(),
          );
          return {
            recentSearches: [
              { query: trimmed, timestamp: Date.now() },
              ...filtered,
            ].slice(0, MAX_RECENT),
          };
        });
      },

      removeRecentSearch: (query) => {
        set((state) => ({
          recentSearches: state.recentSearches.filter(
            (s) => s.query.toLowerCase() !== query.toLowerCase(),
          ),
        }));
      },

      clearRecentSearches: () => {
        set({ recentSearches: [] });
      },
    }),
    {
      name: 'maxlinify-search',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
