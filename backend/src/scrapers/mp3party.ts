import * as cheerio from 'cheerio';
import { browserPool, createConfiguredPage } from '../browserPool.js';
import type { Scraper, SearchResult, TrackStream } from '@maxlinify/shared';

const BASE_URL = 'https://mp3party.net';

class Mp3PartyScraper implements Scraper {
  async search(query: string): Promise<SearchResult[]> {
    const browser = await browserPool.acquire();
    let page;

    try {
      page = await createConfiguredPage(browser);
      const url = `${BASE_URL}/search?q=${encodeURIComponent(query)}`;

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });

      const html = await page.content();
      const $ = cheerio.load(html);
      const results: SearchResult[] = [];

      $('.track, .song-item, .composition, [class*="track"], [data-id]').each((_i, el) => {
        try {
          const $el = $(el);
          const id = $el.attr('data-id') || $el.attr('data-track-id') || '';
          if (!id) return;

          const titleEl = $el.find('.track-title, .song-title, .name, .title').first();
          const artistEl = $el.find('.track-artist, .artist, .author').first();

          let title = titleEl.text().trim();
          let artist = artistEl.text().trim();

          if (!artist && title.includes('—')) {
            const parts = title.split('—');
            artist = parts[0].trim();
            title = parts[1].trim();
          } else if (!artist && title.includes('-')) {
            const parts = title.split('-');
            artist = parts[0].trim();
            title = parts.slice(1).join('-').trim();
          }

          if (!title) return;

          const durationText = $el.find('.duration, .time, .length').first().text().trim();
          const img = $el.find('img').first();
          const coverUrl = img.attr('src') || img.attr('data-src') || '';

          results.push({
            id: `mp3party-${id}`,
            title,
            artist: artist || 'Unknown',
            duration: parseDuration(durationText),
            coverUrl: coverUrl.startsWith('http') ? coverUrl : coverUrl ? `${BASE_URL}${coverUrl}` : '',
            source: 'mp3party',
          });
        } catch {
          // Skip
        }
      });

      return results;
    } catch (err: any) {
      console.error('[Mp3Party] Search error:', err.message);
      return [];
    } finally {
      if (page) await page.close().catch(() => {});
      browserPool.release(browser);
    }
  }

  async getStreamUrl(trackId: string): Promise<TrackStream> {
    const id = trackId.replace('mp3party-', '');
    const browser = await browserPool.acquire();
    let page;

    try {
      page = await createConfiguredPage(browser);

      await page.setRequestInterception(false);
      await page.setRequestInterception(true);

      let mp3Url = '';

      page.on('request', (req) => {
        const reqUrl = req.url();
        const type = req.resourceType();

        if (reqUrl.includes('.mp3') || reqUrl.includes('/download/') || reqUrl.includes('/dl/')) {
          mp3Url = reqUrl;
        }

        if (['image', 'stylesheet', 'font'].includes(type)) {
          req.abort();
        } else {
          req.continue();
        }
      });

      page.on('response', (resp) => {
        const respUrl = resp.url();
        if (respUrl.includes('.mp3') || respUrl.includes('/download/')) {
          mp3Url = respUrl;
        }
      });

      const trackUrl = `${BASE_URL}/track/${id}`;
      await page.goto(trackUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });

      // Try clicking play/download
      try {
        await page.click('[class*="play"], .play-btn, .btn-play, .download-btn');
        await new Promise((r) => setTimeout(r, 2000));
      } catch {
        // Button not found
      }

      if (!mp3Url) {
        const html = await page.content();
        const match = html.match(/https?:\/\/[^"'\s]+\.mp3[^"'\s]*/);
        if (match) mp3Url = match[0];
      }

      if (!mp3Url) {
        mp3Url = await page.evaluate(() => {
          const el = document.querySelector('[data-url], [data-mp3], [data-src]');
          return el?.getAttribute('data-url') ||
            el?.getAttribute('data-mp3') ||
            el?.getAttribute('data-src') || '';
        });
      }

      if (!mp3Url) {
        throw new Error('Could not extract MP3 URL from Mp3Party');
      }

      return {
        mp3Url,
        expiresAt: Date.now() + 3600 * 1000,
        source: 'mp3party',
      };
    } catch (err: any) {
      console.error('[Mp3Party] Stream error:', err.message);
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

export const mp3partyScraper = new Mp3PartyScraper();
