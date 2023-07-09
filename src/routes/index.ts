import { Router } from 'express';
import { vpos } from '../controllers';

const router = Router();

router.post('/vpos/v1', vpos);

export default router;
