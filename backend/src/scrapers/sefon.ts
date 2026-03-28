import * as cheerio from 'cheerio';
import { browserPool, createConfiguredPage } from '../browserPool.js';
import type { Scraper, SearchResult, TrackStream } from '@maxlinify/shared';

const BASE_URL = 'https://sefon.pro';

class SefonScraper implements Scraper {
  async search(query: string): Promise<SearchResult[]> {
    const browser = await browserPool.acquire();
    let page;

    try {
      page = await createConfiguredPage(browser);
      const url = `${BASE_URL}/search/?q=${encodeURIComponent(query)}`;

      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 10000 });

      const html = await page.content();
      const $ = cheerio.load(html);
      const results: SearchResult[] = [];

      // Parse search result items
      $('.mp3-list .item, .results .item, [class*="song"], .music-list .item').each((_i, el) => {
        try {
          const $el = $(el);

          // Extract link and ID
          const link = $el.find('a[href*="/mp3/"]').first();
          const href = link.attr('href') || '';
          const idMatch = href.match(/\/mp3\/(\d+)/);
          if (!idMatch) return;

          const id = idMatch[1];

          // Extract title and artist
          const titleEl = $el.find('.song-title, .name, h3, .title').first();
          const artistEl = $el.find('.artist, .singer, .author').first();

          let title = titleEl.text().trim();
          let artist = artistEl.text().trim();

          // Fallback: try splitting "Artist — Title" pattern
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

          // Extract cover image
          const img = $el.find('img').first();
          const coverUrl = img.attr('src') || img.attr('data-src') || '';
          const fullCoverUrl = coverUrl.startsWith('http')
            ? coverUrl
            : coverUrl
              ? `${BASE_URL}${coverUrl}`
              : '';

          // Extract duration
          const durationText = $el.find('.duration, .time, .length').first().text().trim();
          const duration = parseDuration(durationText);

          results.push({
            id: `sefon-${id}`,
            title: title || 'Unknown',
            artist: artist || 'Unknown',
            duration,
            coverUrl: fullCoverUrl,
            source: 'sefon',
          });
        } catch {
          // Skip malformed entries
        }
      });

      return results;
    } catch (err: any) {
      console.error('[SeFon] Search error:', err.message);
      return [];
    } finally {
      if (page) await page.close().catch(() => {});
      browserPool.release(browser);
    }
  }

  async getStreamUrl(trackId: string): Promise<TrackStream> {
    const id = trackId.replace('sefon-', '');
    const browser = await browserPool.acquire();
    let page;

    try {
      page = await createConfiguredPage(browser);

      // Re-enable media requests for this page so we can intercept MP3 URLs
      await page.setRequestInterception(false);
      await page.setRequestInterception(true);

      let mp3Url = '';

      page.on('request', (req) => {
        const reqUrl = req.url();
        const type = req.resourceType();

        // Intercept MP3 URLs from SeFon CDN
        if (reqUrl.includes('.mp3') && reqUrl.includes('sefon.pro')) {
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
        if (respUrl.includes('.mp3') && respUrl.includes('sefon')) {
          mp3Url = respUrl;
        }
      });

      // Navigate to the track page
      const trackUrl = `${BASE_URL}/mp3/${id}/`;
      await page.goto(trackUrl, { waitUntil: 'domcontentloaded', timeout: 10000 });

      // Try clicking the play button to trigger MP3 request
      try {
        await page.click('.play-btn, .btn-play, [class*="play"], .player-btn');
        await page.waitForTimeout(2000);
      } catch {
        // Play button not found, try alternative approach
      }

      // If no MP3 URL intercepted, try extracting from page source
      if (!mp3Url) {
        const html = await page.content();
        const mp3Match = html.match(/https?:\/\/cdn\d*\.sefon\.pro[^"'\s]+\.mp3[^"'\s]*/);
        if (mp3Match) {
          mp3Url = mp3Match[0];
        }
      }

      // Try data attributes
      if (!mp3Url) {
        mp3Url = await page.evaluate(() => {
          const el = document.querySelector('[data-url], [data-mp3], [data-src]');
          if (el) {
            return (
              el.getAttribute('data-url') ||
              el.getAttribute('data-mp3') ||
              el.getAttribute('data-src') ||
              ''
            );
          }
          return '';
        });
      }

      if (!mp3Url) {
        throw new Error('Could not extract MP3 URL');
      }

      return {
        mp3Url,
        expiresAt: Date.now() + 3600 * 1000, // ~1 hour estimate
        source: 'sefon',
      };
    } catch (err: any) {
      console.error('[SeFon] Stream error:', err.message);
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

export const sefonScraper = new SefonScraper();
