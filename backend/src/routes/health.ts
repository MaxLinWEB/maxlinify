import { Router } from 'express';
import { browserPool } from '../browserPool.js';
import type { HealthResponse } from '@maxlinify/shared';

export const healthRouter = Router();

healthRouter.get('/health', (_req, res) => {
  const response: HealthResponse = {
    status: 'ok',
    browsersReady: browserPool.totalCount,
  };
  res.json(response);
});
