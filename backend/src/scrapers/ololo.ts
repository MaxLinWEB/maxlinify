import type { Scraper, SearchResult, TrackStream } from '@maxlinify/shared';

class OloloScraper implements Scraper {
  async search(_query: string): Promise<SearchResult[]> {
    // Stub — ololo.fm has semi-public JSON API, prioritize implementing this
    return [];
  }

  async getStreamUrl(_trackId: string): Promise<TrackStream> {
    throw new Error('Ololo scraper not yet implemented');
  }
}

export const ololoScraper = new OloloScraper();
