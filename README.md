# MaxLinify

A cross-platform music streaming mobile app built with React Native (Expo) and a Node.js backend with Puppeteer-based scrapers.

## Project Structure

```
/Maxlinify
  /shared       ← Shared TypeScript types
  /backend      ← Node.js + Express + Puppeteer (Docker)
  /mobile       ← React Native (Expo) app
  /src          ← Original Figma web prototype (design reference)
```

## Quick Start

### 1. Backend

```bash
cd backend
cp .env.example .env

# Option A: Docker (recommended)
docker-compose up -d

# Option B: Local (requires Chrome/Chromium installed)
npm install
npm run dev
```

The backend runs on `http://localhost:3000`. Test it:
```bash
curl http://localhost:3000/api/health
```

### 2. Mobile App

```bash
cd mobile
npm install
npx expo start
```

Scan the QR code with Expo Go (Android) or Camera app (iOS).

### Connecting Mobile to Backend

When running on a physical device, the mobile app needs your computer's local IP:

1. Find your IP:
   - **Windows:** `ipconfig` (look for IPv4 Address)
   - **Mac/Linux:** `ifconfig` or `ip addr`
2. Edit `mobile/src/services/api.ts` and replace `localhost` with your IP:
   ```typescript
   const BASE_URL = __DEV__
     ? 'http://192.168.1.XXX:3000/api'  // ← your IP here
     : 'http://YOUR_SERVER_IP:3000/api';
   ```

## Tech Stack

### Mobile
- Expo SDK 51+ with expo-router (file-based navigation)
- expo-av for audio playback (background audio supported)
- Zustand for state management
- React Query for data fetching
- AsyncStorage for local persistence

### Backend
- Express.js HTTP server
- Puppeteer with stealth plugin (headless Chrome)
- Browser pool (2 persistent instances for fast searches)
- node-cache with per-route TTLs
- Docker with Chromium

### Music Sources
- **SeFon.pro** — Primary source (fully implemented)
- **Zaycev.net** — Secondary with geo-fallback
- mp3party, hitmotop, ololo — Stubs ready for implementation

## API Endpoints

| Endpoint | Description | Cache TTL |
|----------|-------------|-----------|
| `GET /api/search?q={query}` | Search across all sources | 10 min |
| `GET /api/stream?id={id}&source={src}` | Get temporary MP3 URL | 90 sec |
| `GET /api/lyrics?artist={a}&title={t}` | Synced lyrics from LRCLIB | 24 hours |
| `GET /api/health` | Backend health check | - |

## App Screens

- **Home** — Featured playlists, popular artists, daily mixes
- **Search** — Debounced search with category browsing
- **Library** — Favorites, playlists, liked songs
- **Player** — Full-screen with album art, progress bar, lyrics, queue
- **Mini Player** — Persistent floating bar above tab navigation
