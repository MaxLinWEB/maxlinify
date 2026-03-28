import express from 'express';
import cors from 'cors';
import { browserPool } from './browserPool.js';
import { healthRouter } from './routes/health.js';
import { searchRouter } from './routes/search.js';
import { streamRouter } from './routes/stream.js';
import { lyricsRouter } from './routes/lyrics.js';

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);

app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// Simple rate limiter — per-IP window counter
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 60; // 60 requests per minute per IP

app.use('/api/search', (req, res, next) => {
  const ip = req.ip || req.socket.remoteAddress || 'unknown';
  const now = Date.now();
  let entry = rateLimitMap.get(ip);

  if (!entry || now >= entry.resetAt) {
    entry = { count: 0, resetAt: now + RATE_LIMIT_WINDOW_MS };
    rateLimitMap.set(ip, entry);
  }

  entry.count++;

  if (entry.count > RATE_LIMIT_MAX) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' });
    return;
  }

  next();
});

// Clean up stale rate limit entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    if (now >= entry.resetAt) rateLimitMap.delete(ip);
  }
}, 5 * 60 * 1000);

// Routes
app.use('/api', healthRouter);
app.use('/api', searchRouter);
app.use('/api', streamRouter);
app.use('/api', lyricsRouter);

// Global error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('[Server] Unhandled error:', err.message || err);
  res.status(500).json({ error: 'Internal server error' });
});

async function start() {
  try {
    await browserPool.initialize();
    app.listen(PORT, () => {
      console.log(`[Server] MaxLinify backend running on port ${PORT}`);
    });
  } catch (err) {
    console.error('[Server] Failed to start:', err);
    process.exit(1);
  }
}

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('[Server] Shutting down...');
  await browserPool.shutdown();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('[Server] Shutting down...');
  await browserPool.shutdown();
  process.exit(0);
});

start();
