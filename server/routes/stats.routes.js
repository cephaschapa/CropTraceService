import { Router } from 'express';
import * as stats from '../controllers/stats.controller.js';

export default function StatsRoutes(app) {
  const router = Router();
  router.get('/', stats.calculateStats);

  app.use('/api/stats', router);
}


