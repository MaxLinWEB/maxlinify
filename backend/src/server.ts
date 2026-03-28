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

// Routes
app.use('/api', healthRouter);
app.use('/api', searchRouter);
app.use('/api', streamRouter);
app.use('/api', lyricsRouter);

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
