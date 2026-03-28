import type { Scraper, SearchResult, TrackStream } from '@maxlinify/shared';

class Mp3PartyScraper implements Scraper {
  async search(_query: string): Promise<SearchResult[]> {
    // Stub — not yet implemented
    return [];
  }

  async getStreamUrl(_trackId: string): Promise<TrackStream> {
    throw new Error('Mp3Party scraper not yet implemented');
  }
}

export const mp3partyScraper = new Mp3PartyScraper();
