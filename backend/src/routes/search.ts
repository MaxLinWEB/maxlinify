import { Router } from 'express';
import { getCached, setCache, SEARCH_TTL } from '../cache.js';
import { getAllScrapers, recordScraperFailure, recordScraperSuccess } from '../scrapers/index.js';
import type { SearchResult } from '@maxlinify/shared';

export const searchRouter = Router();

const SCRAPER_TIMEOUT_MS = 8000;

function withTimeout<T>(promise: Promise<T>, ms: number): Promise<T> {
  return Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('Scraper timeout')), ms)
    ),
  ]);
}

searchRouter.get('/search', async (req, res) => {
  try {
    const query = req.query.q as string;
    const sources = (req.query.sources as string) || 'all';

    if (!query) {
      res.status(400).json({ error: 'q parameter is required' });
      return;
    }

    const cacheKey = `search:${query}:${sources}`;
    const cached = getCached<SearchResult[]>(cacheKey);
    if (cached) {
      res.json(cached);
      return;
    }

    const scrapers = getAllScrapers(sources);
    const results = await Promise.allSettled(
      scrapers.map(async ({ name, scraper }) => {
        try {
          const tracks = await withTimeout(scraper.search(query), SCRAPER_TIMEOUT_MS);
          recordScraperSuccess(name);
          return tracks;
        } catch (err) {
          recordScraperFailure(name);
          throw err;
        }
      })
    );

    const combined: SearchResult[] = results
      .filter((r): r is PromiseFulfilledResult<SearchResult[]> => r.status === 'fulfilled')
      .flatMap((r) => r.value);

    // Deduplicate by title+artist (case insensitive)
    const seen = new Set<string>();
    const deduped = combined.filter((track) => {
      const key = `${track.title.toLowerCase()}:${track.artist.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });

    setCache(cacheKey, deduped, SEARCH_TTL);
    res.json(deduped);
  } catch (err: any) {
    console.error('[Search] Error:', err.message);
    res.status(500).json({ error: 'Search failed' });
  }
});
