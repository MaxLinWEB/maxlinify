import type { Scraper, SearchResult, TrackStream } from '@maxlinify/shared';
import { sefonScraper } from './sefon.js';
import { zaycevScraper } from './zaycev.js';
import { mp3partyScraper } from './mp3party.js';
import { hitmotopScraper } from './hitmotop.js';
import { ololoScraper } from './ololo.js';

// Circuit breaker state per scraper
interface CircuitState {
  failures: number;
  disabledUntil: number;
}

const circuitBreakers = new Map<string, CircuitState>();
const MAX_FAILURES = 3;
const DISABLE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

const scraperMap: Record<string, Scraper> = {
  ololo: ololoScraper,     // First: fastest (no Puppeteer, uses HTTP)
  sefon: sefonScraper,
  zaycev: zaycevScraper,
  hitmotop: hitmotopScraper,
  mp3party: mp3partyScraper,
};

function isScraperDisabled(name: string): boolean {
  const state = circuitBreakers.get(name);
  if (!state) return false;
  if (Date.now() >= state.disabledUntil) {
    // Reset circuit breaker after cooldown
    circuitBreakers.delete(name);
    return false;
  }
  return state.failures >= MAX_FAILURES;
}

export function recordScraperFailure(name: string): void {
  const state = circuitBreakers.get(name) || { failures: 0, disabledUntil: 0 };
  state.failures += 1;
  if (state.failures >= MAX_FAILURES) {
    state.disabledUntil = Date.now() + DISABLE_DURATION_MS;
    console.warn(`[CircuitBreaker] ${name} disabled for 5 minutes after ${MAX_FAILURES} failures`);
  }
  circuitBreakers.set(name, state);
}

export function recordScraperSuccess(name: string): void {
  circuitBreakers.delete(name);
}

export function getAllScrapers(sources: string = 'all'): { name: string; scraper: Scraper }[] {
  const entries = sources === 'all'
    ? Object.entries(scraperMap)
    : sources.split(',').map((s) => [s.trim(), scraperMap[s.trim()]] as const).filter(([, v]) => v);

  return entries
    .filter(([name]) => !isScraperDisabled(name))
    .map(([name, scraper]) => ({ name, scraper: scraper as Scraper }));
}

export function getScraperBySource(source: string): Scraper | undefined {
  return scraperMap[source];
}
