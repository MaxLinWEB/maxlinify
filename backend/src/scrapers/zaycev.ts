import * as cheerio from 'cheerio';
import { browserPool, createConfiguredPage } from '../browserPool.js';
import type { Scraper, SearchResult, TrackStream } from '@maxlinify/shared';

const BASE_URL = 'https://zaycev.net';

class GeoBlockedError extends Error {
  constructor() {
    super('Zaycev.net is geo-blocked in this region');
    this.name = 'GeoBlockedError';
  }
}

class ZaycevScraper implements Scraper {
  async search(query: string): Promise<SearchResult[]> {
    const browser = await browserPool.acquire();
    let page;

    try {
      page = await createConfiguredPage(browser);
      const url = `${BASE_URL}/search.html?query_search=${encodeURIComponent(query)}`;

      const response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });

      // Check for geo-blocking
      if (!response || response.status() === 403 || response.status() === 451) {
        console.warn('[Zaycev] Geo-blocked, skipping');
        return [];
      }

      const html = await page.content();

      // Detect geo-block page content
      if (html.includes('доступ ограничен') || html.includes('blocked') || html.includes('unavailable')) {
        console.warn('[Zaycev] Geo-blocked (content check), skipping');
        return [];
      }

      const $ = cheerio.load(html);
      const results: SearchResult[] = [];

      $('.musicset-track, .track-item, [class*="track"]').each((_i, el) => {
        try {
          const $el = $(el);
          const idAttr = $el.attr('data-id') || $el.attr('id') || '';
          const id = idAttr.replace(/\D/g, '');
          if (!id) return;

          const title = $el.find('.track-name, .musicset-track__track-name, .title').first().text().trim();
          const artist = $el.find('.artist-name, .musicset-track__artist, .artist').first().text().trim();
          const durationText = $el.find('.duration, .time').first().text().trim();
          const img = $el.find('img').first();
          const coverUrl = img.attr('src') || img.attr('data-src') || '';

          if (!title) return;

          results.push({
            id: `zaycev-${id}`,
            title,
            artist: artist || 'Unknown',
            duration: parseDuration(durationText),
            coverUrl: coverUrl.startsWith('http') ? coverUrl : coverUrl ? `${BASE_URL}${coverUrl}` : '',
            source: 'zaycev',
          });
        } catch {
          // Skip
        }
      });

      return results;
    } catch (err: any) {
      console.warn('[Zaycev] Search failed (likely geo-blocked):', err.message);
      return [];
    } finally {
      if (page) await page.close().catch(() => {});
      browserPool.release(browser);
    }
  }

  async getStreamUrl(trackId: string): Promise<TrackStream> {
    const id = trackId.replace('zaycev-', '');
    const browser = await browserPool.acquire();
    let page;

    try {
      page = await createConfiguredPage(browser);
      await page.setRequestInterception(false);
      await page.setRequestInterception(true);

      let mp3Url = '';

      page.on('response', (resp) => {
        const url = resp.url();
        if (url.includes('.mp3') || url.includes('/stream/') || url.includes('audio')) {
          mp3Url = url;
        }
      });

      page.on('request', (req) => {
        const type = req.resourceType();
        if (['image', 'stylesheet', 'font'].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      const trackUrl = `${BASE_URL}/pages/${id}/`;
      const response = await page.goto(trackUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });

      if (!response || response.status() === 403 || response.status() === 451) {
        throw new GeoBlockedError();
      }

      // Try triggering playback
      try {
        await page.click('[class*="play"], .play-btn, .btn-play');
        await page.waitForTimeout(2000);
      } catch {
        // Button not found
      }

      if (!mp3Url) {
        const html = await page.content();
        const match = html.match(/https?:\/\/[^"'\s]+\.mp3[^"'\s]*/);
        if (match) mp3Url = match[0];
      }

      if (!mp3Url) {
        throw new Error('Could not extract MP3 URL from Zaycev');
      }

      return {
        mp3Url,
        expiresAt: Date.now() + 3600 * 1000,
        source: 'zaycev',
      };
    } catch (err: any) {
      console.error('[Zaycev] Stream error:', err.message);
      throw err;
    } finally {
      if (page) await page.close().catch(() => {});
      browserPool.release(browser);
    }
  }
}

function parseDuration(text: string): number {
  if (!text) return 0;
  const parts = text.split(':');
  if (parts.length === 2) {
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }
  return 0;
}

export const zaycevScraper = new ZaycevScraper();
