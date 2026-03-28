# 🎵 Music App — Claude Code Master Prompt

## CONTEXT & GOAL

Build a **personal, non-commercial music streaming mobile app** using React Native (Expo) with a Node.js backend running in Docker. The app streams music from external platforms (SeFon.pro, Zaycev.net, and others) by using a headless browser (Puppeteer) to intercept MP3 URLs in real-time. The UI is built from my Figma-exported React components.

---

## PROJECT STRUCTURE

Create the following monorepo structure:

```
/music-app
  /mobile          ← React Native (Expo) app
    /src
      /components  ← my Figma components go here (do not modify their styling)
      /screens     ← app screens
      /services    ← API calls to backend
      /store       ← Zustand state management
      /hooks       ← custom hooks
    App.tsx
    app.json

  /backend         ← Node.js + Express + Puppeteer
    /src
      /scrapers    ← one file per music platform
      /routes      ← API routes
      /cache       ← caching layer
    Dockerfile
    docker-compose.yml
    server.js

  /shared          ← shared TypeScript types
    types.ts
```

---

## TECH STACK

### Mobile (React Native)
- **Expo SDK 51+**
- **expo-av** — audio playback
- **expo-router** — navigation (file-based routing)
- **Zustand** — state management (player state, favorites, playlists, queue)
- **AsyncStorage** — persistent local storage for favorites and playlists
- **React Query (TanStack Query)** — data fetching, caching, loading states
- **TypeScript** — strict mode

### Backend (Node.js in Docker)
- **Express.js** — HTTP server
- **Puppeteer Extra + puppeteer-extra-plugin-stealth** — headless Chrome, anti-bot bypass
- **Cheerio** — HTML parsing fallback
- **node-cache** — in-memory cache (TTL 10 minutes for search, 90 seconds for MP3 URLs)
- **axios** — HTTP requests
- **cors** — allow mobile app origin
- **TypeScript**

---

## BACKEND — DETAILED IMPLEMENTATION

### Architecture: Browser Pool

CRITICAL: Do NOT start a new Puppeteer browser per request. Use a **persistent browser pool** with 2 browser instances kept alive. This reduces search latency from ~3s to ~0.5s.

```typescript
// /backend/src/browserPool.ts
class BrowserPool {
  private browsers: Browser[] = [];
  private queue: (() => void)[] = [];
  private inUse: Set<Browser> = new Set();

  async initialize(size = 2) {
    // Launch `size` browser instances with stealth plugin
    // Keep them alive permanently
    // Block images, CSS, fonts inside pages (speeds up page load 3x)
  }

  async acquire(): Promise<Browser> { /* wait for free browser */ }
  async release(browser: Browser): Promise<void> { /* return to pool */ }
}
```

Each page inside the browser should block unnecessary resources:
```typescript
await page.setRequestInterception(true);
page.on('request', req => {
  const type = req.resourceType();
  if (['image', 'stylesheet', 'font', 'media'].includes(type)) {
    req.abort();
  } else {
    req.continue();
  }
});
```

### Platform Scrapers

Create one scraper file per platform. Each scraper implements this interface:

```typescript
// /shared/types.ts
interface SearchResult {
  id: string;           // platform-specific ID
  title: string;
  artist: string;
  duration: number;     // seconds
  coverUrl: string;
  source: 'sefon' | 'zaycev' | 'mp3party' | 'hitmotop';
}

interface TrackStream {
  mp3Url: string;       // direct CDN URL, signed/temporary
  expiresAt: number;    // unix timestamp (estimate TTL ~1 hour)
  source: string;
}

interface Scraper {
  search(query: string): Promise<SearchResult[]>;
  getStreamUrl(trackId: string): Promise<TrackStream>;
}
```

#### Scraper 1: SeFon.pro

```typescript
// /backend/src/scrapers/sefon.ts

// SEARCH:
// URL: https://sefon.pro/search/?q={query}
// Method: Puppeteer navigate to URL, then intercept responses
// OR: parse HTML with Cheerio looking for song cards

// MP3 URL extraction:
// When user clicks Play on a SeFon track, navigate to the track page
// Intercept network requests for URLs matching:
//   - cdn*.sefon.pro
//   - containing .mp3
// The intercepted URL has format:
//   https://cdn6.sefon.pro/prev/{token}/{timestamp}/{id}/{filename}.mp3
// This token expires — fetch fresh URL each time user presses Play

// IMPORTANT: Set realistic browser headers:
// User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36
// Accept-Language: ru-RU,ru;q=0.9,en-US;q=0.8
// Referer: https://sefon.pro/

// For search results, extract:
// - Song title (from h3 or .song-title selector — inspect and update)
// - Artist name
// - Song ID (from href or data attribute)
// - Cover image URL
// - Duration if available
```

#### Scraper 2: Zaycev.net

```typescript
// /backend/src/scrapers/zaycev.ts

// NOTE: Zaycev.net has geo-restrictions (Russia-focused)
// Moldova (MD) may or may not have full access
// Implement with fallback: if request fails, skip this source silently

// Same pattern: Puppeteer → navigate → intercept MP3 responses
// Set User-Agent to a Russian browser locale
// If consistently blocked, this scraper should return [] for search
// and throw a GeoBlockedError for stream requests
```

#### Scraper 3+: Additional platforms (implement as stubs, ready to fill)

```typescript
// /backend/src/scrapers/mp3party.ts  — stub
// /backend/src/scrapers/hitmotop.ts  — stub
// /backend/src/scrapers/ololo.ts     — stub (ololo.fm has semi-public JSON API, prioritize this)
```

### API Routes

```
GET  /api/search?q={query}&sources={sefon,zaycev,all}
  → Parallel search across all enabled sources
  → Returns: SearchResult[]
  → Cache TTL: 10 minutes

GET  /api/stream?id={trackId}&source={source}
  → Opens track page via Puppeteer, intercepts MP3 URL
  → Returns: { mp3Url: string, expiresAt: number }
  → Cache TTL: 60 seconds (tokens expire fast)
  → NEVER cache this for more than 90 seconds

GET  /api/lyrics?artist={artist}&title={title}
  → Proxy to LRCLIB.net API (free, no key needed)
  → Endpoint: https://lrclib.net/api/get?artist_name={artist}&track_name={title}
  → Returns: { syncedLyrics: string | null, plainLyrics: string | null }
  → Cache TTL: 24 hours

GET  /api/health
  → Returns { status: 'ok', browsersReady: number }
```

### Parallel Search Implementation

```typescript
// /backend/src/routes/search.ts
router.get('/search', async (req, res) => {
  const { q, sources = 'all' } = req.query;

  // Check cache first
  const cacheKey = `search:${q}:${sources}`;
  const cached = cache.get(cacheKey);
  if (cached) return res.json(cached);

  // Run all scrapers in parallel, don't fail if one scraper throws
  const results = await Promise.allSettled([
    sefonScraper.search(q),
    zaycevScraper.search(q),
    // add more scrapers here
  ]);

  const combined = results
    .filter(r => r.status === 'fulfilled')
    .flatMap(r => r.value)
    .sort((a, b) => /* relevance score */ 0);

  cache.set(cacheKey, combined, 600); // 10 min TTL
  res.json(combined);
});
```

### Docker Setup

```dockerfile
# /backend/Dockerfile
FROM node:20-slim

# Install Chromium dependencies for Puppeteer
RUN apt-get update && apt-get install -y \
  chromium \
  fonts-liberation \
  libappindicator3-1 \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  xdg-utils \
  --no-install-recommends \
  && rm -rf /var/lib/apt/lists/*

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/server.js"]
```

```yaml
# /backend/docker-compose.yml
version: '3.8'
services:
  backend:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - PORT=3000
      - BROWSER_POOL_SIZE=2
    restart: unless-stopped
    shm_size: '256mb'  # Required for Chromium stability
```

---

## MOBILE APP — DETAILED IMPLEMENTATION

### Navigation Structure (expo-router)

```
app/
  (tabs)/
    index.tsx        ← Home / Discover screen
    search.tsx       ← Search screen
    library.tsx      ← Favorites + Playlists screen
  player.tsx         ← Full-screen player (modal)
  playlist/[id].tsx  ← Playlist detail screen
  _layout.tsx        ← Root layout with persistent MiniPlayer
```

### State Management (Zustand)

```typescript
// /mobile/src/store/playerStore.ts
interface PlayerStore {
  // Current track
  currentTrack: SearchResult | null;
  isPlaying: boolean;
  position: number;        // ms
  duration: number;        // ms
  isLoading: boolean;

  // Queue
  queue: SearchResult[];
  queueIndex: number;

  // Actions
  play: (track: SearchResult) => Promise<void>;
  pause: () => void;
  resume: () => void;
  seek: (positionMs: number) => void;
  skipNext: () => void;
  skipPrevious: () => void;
  addToQueue: (track: SearchResult) => void;
  clearQueue: () => void;
  setQueue: (tracks: SearchResult[], startIndex: number) => void;
}

// /mobile/src/store/libraryStore.ts
interface LibraryStore {
  favorites: SearchResult[];
  playlists: Playlist[];

  addFavorite: (track: SearchResult) => void;
  removeFavorite: (trackId: string) => void;
  isFavorite: (trackId: string) => boolean;

  createPlaylist: (name: string) => Playlist;
  deletePlaylist: (playlistId: string) => void;
  addToPlaylist: (playlistId: string, track: SearchResult) => void;
  removeFromPlaylist: (playlistId: string, trackId: string) => void;
  renamePlaylist: (playlistId: string, name: string) => void;
}
```

### Audio Service

```typescript
// /mobile/src/services/audioService.ts
import { Audio } from 'expo-av';

class AudioService {
  private sound: Audio.Sound | null = null;
  private onStatusUpdate: (status: AVPlaybackStatus) => void;

  async loadAndPlay(mp3Url: string): Promise<void> {
    // Unload previous sound
    if (this.sound) await this.sound.unloadAsync();

    // Configure audio session
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,     // ← CRITICAL: plays when screen is locked
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
    });

    const { sound } = await Audio.Sound.createAsync(
      { uri: mp3Url },
      { shouldPlay: true, progressUpdateIntervalMillis: 500 },
      this.onStatusUpdate
    );
    this.sound = sound;
  }

  async pause() { await this.sound?.pauseAsync(); }
  async resume() { await this.sound?.playAsync(); }
  async seek(positionMs: number) { await this.sound?.setPositionAsync(positionMs); }
  async unload() { await this.sound?.unloadAsync(); this.sound = null; }
}
```

### API Service

```typescript
// /mobile/src/services/api.ts
const BASE_URL = __DEV__ ? 'http://localhost:3000/api' : 'http://YOUR_SERVER_IP:3000/api';

export const musicApi = {
  search: async (query: string): Promise<SearchResult[]> => {
    const res = await fetch(`${BASE_URL}/search?q=${encodeURIComponent(query)}&sources=all`);
    return res.json();
  },

  getStreamUrl: async (trackId: string, source: string): Promise<TrackStream> => {
    const res = await fetch(`${BASE_URL}/stream?id=${trackId}&source=${source}`);
    if (!res.ok) throw new Error('Failed to get stream URL');
    return res.json();
  },

  getLyrics: async (artist: string, title: string): Promise<LyricsResult> => {
    const res = await fetch(`${BASE_URL}/lyrics?artist=${encodeURIComponent(artist)}&title=${encodeURIComponent(title)}`);
    return res.json();
  },
};
```

### Key Screens

#### Search Screen (`/app/(tabs)/search.tsx`)
- Debounced search input (300ms debounce)
- Shows results in a FlatList, grouped by source
- Each result card shows: cover, title, artist, duration, source badge
- Tap card → play immediately + fetch stream URL
- Long press card → bottom sheet with: Add to Queue, Add to Playlist, Add to Favorites, View Artist

#### Player Screen (`/app/player.tsx`)
- Full-screen modal slide-up
- Album art (large, with blur background)
- Track title + artist
- Progress bar (scrubable)
- Controls: shuffle, previous, play/pause, next, repeat
- Heart button (add to favorites)
- Lyrics tab — show synced lyrics from LRCLIB, scroll in sync with audio position
- Queue tab — show upcoming tracks, reorderable

#### Mini Player (persistent, in `_layout.tsx`)
- 64px height bar at bottom, above tab bar
- Shows: cover thumbnail, title, artist, play/pause button, skip button
- Tap → opens full Player modal
- Animated progress indicator

#### Library Screen (`/app/(tabs)/library.tsx`)
- Two sections: **Favorites** and **Playlists**
- Create new playlist button
- Playlist cards with cover collage (first 4 song covers)
- Swipe to delete

---

## LYRICS IMPLEMENTATION

```typescript
// Synced lyrics from LRCLIB come in LRC format:
// [00:12.34] Line of lyrics here
// [00:15.67] Next line

// Parse LRC format:
interface LyricLine {
  timeMs: number;
  text: string;
}

function parseLRC(lrc: string): LyricLine[] {
  return lrc.split('\n')
    .map(line => {
      const match = line.match(/\[(\d+):(\d+)\.(\d+)\](.*)/);
      if (!match) return null;
      const [, min, sec, cs, text] = match;
      return {
        timeMs: (parseInt(min) * 60 + parseInt(sec)) * 1000 + parseInt(cs) * 10,
        text: text.trim()
      };
    })
    .filter(Boolean) as LyricLine[];
}

// In the Player screen, use the current audio position to highlight
// the active lyric line and auto-scroll the lyrics list
```

---

## DATA PERSISTENCE

All user data is stored locally with AsyncStorage. No backend database needed.

```typescript
// Keys:
// 'favorites'  → SearchResult[] (JSON)
// 'playlists'  → Playlist[] (JSON)
// 'settings'   → { lastSource, volume, shuffle, repeat }

// IMPORTANT: Store only these fields per track (NOT the mp3Url, it expires):
interface StoredTrack {
  id: string;
  title: string;
  artist: string;
  duration: number;
  coverUrl: string;
  source: 'sefon' | 'zaycev' | 'mp3party' | 'hitmotop';
  // NO mp3Url — fetch fresh on playback
}
```

---

## FIGMA COMPONENTS INTEGRATION

My Figma components are exported as React Native components and placed in `/mobile/src/components/`. Follow these rules:

1. **DO NOT modify** any component in `/mobile/src/components/` — these are my design assets
2. **DO import and compose** them in screens and other components
3. If a Figma component needs data props, add TypeScript props to it with `// @inject` comment so I can see what you added
4. If a screen needs a UI element that doesn't exist in my Figma components, build it to match the visual style of my existing components (same border radius, spacing, font sizes, colors)
5. Assume my components use StyleSheet or styled-components — adapt if needed

---

## ERROR HANDLING & EDGE CASES

Handle these scenarios gracefully:

1. **MP3 URL expired** → If audio fails to play, auto-retry `getStreamUrl` once, then show "Could not load track" toast
2. **Search returns 0 results** → Show empty state with illustration and suggestion
3. **Backend unreachable** → Show offline banner, disable search, still allow browsing favorites/playlists
4. **Zaycev geo-blocked** → Silently skip Zaycev results, show only SeFon results (no error shown to user)
5. **Lyrics not found** → Show "No lyrics available" in lyrics tab
6. **Audio interrupted** (phone call, etc.) → Pause automatically, resume when call ends

---

## PERFORMANCE REQUIREMENTS

- Search results must appear within **2 seconds** for a new query
- Cached search results must appear in **< 200ms**
- Audio must start playing within **1.5 seconds** of tapping a track
- FlatList must support 200+ results without jank (use `getItemLayout`, `keyExtractor`, `windowSize`)
- Images must be lazy-loaded with placeholder (use `expo-image` not `Image`)

---

## DEVELOPMENT SETUP INSTRUCTIONS

After generating all files, provide:

1. `README.md` with step-by-step setup:
   ```bash
   # Backend
   cd backend
   docker-compose up -d
   
   # Mobile
   cd mobile
   npm install
   npx expo start
   ```

2. Environment variables file template (`.env.example`)

3. How to find the local IP for connecting the mobile app to the backend during development

---

## WHAT NOT TO BUILD

- No user authentication / login
- No backend database (SQLite, Postgres, etc.) — AsyncStorage only
- No social features
- No payment or subscription logic
- No push notifications (yet)
- No analytics

---

## STARTING POINT

Begin with this order:
1. `/shared/types.ts` — all TypeScript interfaces
2. `/backend` — full backend with Docker, browser pool, SeFon scraper, all routes
3. `/mobile/src/services/` — API and audio services
4. `/mobile/src/store/` — Zustand stores
5. `/mobile/src/screens/` — all screens using my Figma components
6. Navigation + MiniPlayer
7. `README.md`

Start now. Ask me to provide the Figma component files when you reach step 5.
