import type { Scraper, SearchResult, TrackStream } from '@maxlinify/shared';

class HitmotopScraper implements Scraper {
  async search(_query: string): Promise<SearchResult[]> {
    // Stub — not yet implemented
    return [];
  }

  async getStreamUrl(_trackId: string): Promise<TrackStream> {
    throw new Error('Hitmotop scraper not yet implemented');
  }
}

export const hitmotopScraper = new HitmotopScraper();
