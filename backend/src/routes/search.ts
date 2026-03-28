import { Router } from 'express';
import { getCached, setCache, SEARCH_TTL } from '../cache.js';
import { getAllScrapers } from '../scrapers/index.js';
import type { SearchResult } from '@maxlinify/shared';

export const searchRouter = Router();

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
      scrapers.map((scraper) => scraper.search(query))
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
