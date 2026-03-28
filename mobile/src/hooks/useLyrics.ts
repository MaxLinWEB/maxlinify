import { useQuery } from '@tanstack/react-query';
import { musicApi } from '../services/api';
import { parseLRC } from '../utils/lrcParser';
import type { LyricLine } from '@maxlinify/shared';

export function useLyrics(artist: string | undefined, title: string | undefined) {
  return useQuery({
    queryKey: ['lyrics', artist, title],
    queryFn: async () => {
      if (!artist || !title) return null;
      const result = await musicApi.getLyrics(artist, title);

      if (result.syncedLyrics) {
        return {
          lines: parseLRC(result.syncedLyrics),
          plain: result.plainLyrics,
          synced: true,
        };
      }

      if (result.plainLyrics) {
        return {
          lines: result.plainLyrics.split('\n').map((text, i) => ({
            timeMs: i * 5000, // rough estimate
            text,
          })) as LyricLine[],
          plain: result.plainLyrics,
          synced: false,
        };
      }

      return null;
    },
    enabled: !!artist && !!title,
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });
}
