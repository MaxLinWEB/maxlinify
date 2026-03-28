import NodeCache from 'node-cache';

const cache = new NodeCache({ checkperiod: 60 });

export const SEARCH_TTL = 600;   // 10 minutes
export const STREAM_TTL = 90;    // 90 seconds
export const LYRICS_TTL = 86400; // 24 hours

export function getCached<T>(key: string): T | undefined {
  return cache.get<T>(key);
}

export function setCache<T>(key: string, value: T, ttl: number): void {
  cache.set(key, value, ttl);
}

export default cache;
