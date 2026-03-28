import type { Scraper } from '@maxlinify/shared';
import { sefonScraper } from './sefon.js';
import { zaycevScraper } from './zaycev.js';
import { mp3partyScraper } from './mp3party.js';
import { hitmotopScraper } from './hitmotop.js';
import { ololoScraper } from './ololo.js';

const scraperMap: Record<string, Scraper> = {
  sefon: sefonScraper,
  zaycev: zaycevScraper,
  mp3party: mp3partyScraper,
  hitmotop: hitmotopScraper,
  ololo: ololoScraper,
};

export function getAllScrapers(sources: string = 'all'): Scraper[] {
  if (sources === 'all') {
    return Object.values(scraperMap);
  }

  return sources
    .split(',')
    .map((s) => scraperMap[s.trim()])
    .filter(Boolean);
}

export function getScraperBySource(source: string): Scraper | undefined {
  return scraperMap[source];
}
