import { Router } from 'express';
import { getCached, setCache, STREAM_TTL } from '../cache.js';
import { getScraperBySource } from '../scrapers/index.js';
import type { TrackStream } from '@maxlinify/shared';

export const streamRouter = Router();

streamRouter.get('/stream', async (req, res) => {
  try {
    const trackId = req.query.id as string;
    const source = req.query.source as string;
    const skipCache = req.query.skipCache === 'true';

    if (!trackId || !source) {
      res.status(400).json({ error: 'id and source are required' });
      return;
    }

    const cacheKey = `stream:${source}:${trackId}`;

    if (!skipCache) {
      const cached = getCached<TrackStream>(cacheKey);
      if (cached) {
        res.json(cached);
        return;
      }
    }

    const scraper = getScraperBySource(source);
    if (!scraper) {
      res.status(400).json({ error: `Unknown source: ${source}` });
      return;
    }

    const stream = await scraper.getStreamUrl(trackId);
    setCache(cacheKey, stream, STREAM_TTL);
    res.json(stream);
  } catch (err: any) {
    console.error('[Stream] Error:', err.message);
    res.status(500).json({ error: 'Failed to get stream URL' });
  }
});
