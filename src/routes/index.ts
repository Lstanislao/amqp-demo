import { Router } from 'express';
import {
  leagues,
  locations,
  markets,
  schedules,
  sports,
  competitions,
  subscribe,
  unsubscribe,
  tracks,
} from '../controllers';

const router = Router();

router.post('/v1/leagues', leagues);
router.post('/v1/locations', locations);
router.post('/v1/markets', markets);
router.post('/v1/schedules', schedules);
router.post('/v1/sports', sports);
router.post('/v1/horses/competitions', competitions);
router.post('/v1/horses/subscribe', subscribe);
router.post('/v1/horses/unsubscribe', unsubscribe);
router.post('/v1/horses/tracks', tracks);

export default router;
