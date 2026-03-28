import axios from 'axios';
import * as cheerio from 'cheerio';
import type { Scraper, SearchResult, TrackStream } from '@maxlinify/shared';

const BASE_URL = 'https://ololo.fm';

class OloloScraper implements Scraper {
  async search(query: string): Promise<SearchResult[]> {
    try {
      // ololo.fm serves search results as HTML with embedded data
      const { data: html } = await axios.get(`${BASE_URL}/search/${encodeURIComponent(query)}`, {
        timeout: 8000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept-Language': 'ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        },
      });

      const $ = cheerio.load(html);
      const results: SearchResult[] = [];

      // Try JSON API endpoint first
      try {
        const { data: jsonData } = await axios.get(`${BASE_URL}/api/search`, {
          params: { q: query },
          timeout: 8000,
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept': 'application/json',
            'X-Requested-With': 'XMLHttpRequest',
          },
        });

        if (Array.isArray(jsonData)) {
          for (const item of jsonData.slice(0, 20)) {
            results.push({
              id: `ololo-${item.id || item.track_id}`,
              title: item.title || item.name || 'Unknown',
              artist: item.artist || item.author || 'Unknown',
              duration: item.duration || 0,
              coverUrl: item.cover || item.image || '',
              source: 'ololo',
            });
          }
          if (results.length > 0) return results;
        }
      } catch {
        // JSON API not available, fall through to HTML parsing
      }

      // Parse HTML search results
      $('.track, .song, .music-item, [class*="track"], [data-id]').each((_i, el) => {
        try {
          const $el = $(el);
          const id = $el.attr('data-id') || $el.attr('data-track-id') || '';
          if (!id) return;

          const titleEl = $el.find('.track-title, .song-name, .title, .name').first();
          const artistEl = $el.find('.track-artist, .artist, .author').first();
          const durationEl = $el.find('.duration, .time').first();
          const img = $el.find('img').first();

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

          const durationText = durationEl.text().trim();
          const duration = parseDuration(durationText);
          const coverUrl = img.attr('src') || img.attr('data-src') || '';

          results.push({
            id: `ololo-${id}`,
            title,
            artist: artist || 'Unknown',
            duration,
            coverUrl: coverUrl.startsWith('http') ? coverUrl : coverUrl ? `${BASE_URL}${coverUrl}` : '',
            source: 'ololo',
          });
        } catch {
          // Skip malformed
        }
      });

      return results;
    } catch (err: any) {
      console.error('[Ololo] Search error:', err.message);
      return [];
    }
  }

  async getStreamUrl(trackId: string): Promise<TrackStream> {
    const id = trackId.replace('ololo-', '');

    try {
      // Try JSON API for stream URL
      const { data } = await axios.get(`${BASE_URL}/api/track/${id}/stream`, {
        timeout: 8000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        maxRedirects: 5,
      });

      if (data?.url || data?.mp3Url || data?.stream) {
        return {
          mp3Url: data.url || data.mp3Url || data.stream,
          expiresAt: Date.now() + 3600 * 1000,
          source: 'ololo',
        };
      }
    } catch {
      // Fall through to HTML scraping
    }

    // Fallback: scrape the track page for download/play links
    try {
      const { data: html } = await axios.get(`${BASE_URL}/track/${id}`, {
        timeout: 8000,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
          'Accept-Language': 'ru-RU,ru;q=0.9',
        },
      });

      // Look for MP3 URL in page source
      const mp3Match = html.match(/https?:\/\/[^"'\s]+\.mp3[^"'\s]*/);
      if (mp3Match) {
        return {
          mp3Url: mp3Match[0],
          expiresAt: Date.now() + 3600 * 1000,
          source: 'ololo',
        };
      }

      // Look for data attributes
      const $ = cheerio.load(html);
      const streamUrl = $('[data-url], [data-mp3], [data-stream]').first()
        .attr('data-url') || $('[data-mp3]').first().attr('data-mp3') || '';

      if (streamUrl) {
        return {
          mp3Url: streamUrl.startsWith('http') ? streamUrl : `${BASE_URL}${streamUrl}`,
          expiresAt: Date.now() + 3600 * 1000,
          source: 'ololo',
        };
      }
    } catch (err: any) {
      console.error('[Ololo] Stream page error:', err.message);
    }

    throw new Error('Could not extract stream URL from Ololo');
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

export const ololoScraper = new OloloScraper();
