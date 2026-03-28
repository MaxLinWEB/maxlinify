import * as cheerio from 'cheerio';
import { browserPool, createConfiguredPage } from '../browserPool.js';
import type { Scraper, SearchResult, TrackStream } from '@maxlinify/shared';

const BASE_URL = 'https://hitmo.top';

class HitmotopScraper implements Scraper {
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

      $('.track__info, .tracks-table .track, .playlist-item, [class*="track"]').each((_i, el) => {
        try {
          const $el = $(el);

          // Try getting the parent track container if we matched a child
          const $track = $el.closest('[data-id], [class*="track"]').length
            ? $el.closest('[data-id], [class*="track"]')
            : $el;

          const id = $track.attr('data-id') || $track.attr('data-track-id') || '';
          if (!id) return;

          const titleEl = $track.find('.track__title, .track-name, .title').first();
          const artistEl = $track.find('.track__artist, .artist-name, .artist').first();

          let title = titleEl.text().trim();
          let artist = artistEl.text().trim();

          // Fallback: "Artist — Title" pattern
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

          const durationText = $track.find('.track__duration, .duration, .time').first().text().trim();
          const img = $track.find('img').first();
          const coverUrl = img.attr('src') || img.attr('data-src') || '';

          results.push({
            id: `hitmotop-${id}`,
            title,
            artist: artist || 'Unknown',
            duration: parseDuration(durationText),
            coverUrl: coverUrl.startsWith('http') ? coverUrl : coverUrl ? `${BASE_URL}${coverUrl}` : '',
            source: 'hitmotop',
          });
        } catch {
          // Skip malformed
        }
      });

      return results;
    } catch (err: any) {
      console.error('[Hitmotop] Search error:', err.message);
      return [];
    } finally {
      if (page) await page.close().catch(() => {});
      browserPool.release(browser);
    }
  }

  async getStreamUrl(trackId: string): Promise<TrackStream> {
    const id = trackId.replace('hitmotop-', '');
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

        if (reqUrl.includes('.mp3') || reqUrl.includes('/dl/') || reqUrl.includes('/download/')) {
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
        if (respUrl.includes('.mp3') || respUrl.includes('/dl/')) {
          mp3Url = respUrl;
        }
      });

      const trackUrl = `${BASE_URL}/song/${id}`;
      await page.goto(trackUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });

      // Try clicking play
      try {
        await page.click('[class*="play"], .play-btn, .btn-play, .track__play');
        await new Promise((r) => setTimeout(r, 2000));
      } catch {
        // Play button not found
      }

      // Try extracting from HTML
      if (!mp3Url) {
        const html = await page.content();
        const match = html.match(/https?:\/\/[^"'\s]+\.mp3[^"'\s]*/);
        if (match) mp3Url = match[0];
      }

      // Try data attributes
      if (!mp3Url) {
        mp3Url = await page.evaluate(() => {
          const el = document.querySelector('[data-url], [data-mp3], [data-src], [data-download]');
          return el?.getAttribute('data-url') ||
            el?.getAttribute('data-mp3') ||
            el?.getAttribute('data-src') ||
            el?.getAttribute('data-download') || '';
        });
      }

      if (!mp3Url) {
        throw new Error('Could not extract MP3 URL from Hitmotop');
      }

      return {
        mp3Url,
        expiresAt: Date.now() + 3600 * 1000,
        source: 'hitmotop',
      };
    } catch (err: any) {
      console.error('[Hitmotop] Stream error:', err.message);
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

export const hitmotopScraper = new HitmotopScraper();
