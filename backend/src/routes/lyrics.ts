import { Router } from 'express';
import axios from 'axios';
import { getCached, setCache, LYRICS_TTL } from '../cache.js';
import type { LyricsResult } from '@maxlinify/shared';

export const lyricsRouter = Router();

lyricsRouter.get('/lyrics', async (req, res) => {
  try {
    const artist = req.query.artist as string;
    const title = req.query.title as string;

    if (!artist || !title) {
      res.status(400).json({ error: 'artist and title are required' });
      return;
    }

    const cacheKey = `lyrics:${artist}:${title}`;
    const cached = getCached<LyricsResult>(cacheKey);
    if (cached) {
      res.json(cached);
      return;
    }

    const response = await axios.get('https://lrclib.net/api/get', {
      params: {
        artist_name: artist,
        track_name: title,
      },
      timeout: 5000,
    });

    const result: LyricsResult = {
      syncedLyrics: response.data.syncedLyrics || null,
      plainLyrics: response.data.plainLyrics || null,
    };

    setCache(cacheKey, result, LYRICS_TTL);
    res.json(result);
  } catch (err: any) {
    if (err.response?.status === 404) {
      const result: LyricsResult = { syncedLyrics: null, plainLyrics: null };
      res.json(result);
      return;
    }
    console.error('[Lyrics] Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch lyrics' });
  }
});
