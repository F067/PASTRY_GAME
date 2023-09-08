import { Router } from 'express';
const router = Router();

import { getPastryData } from '../Controllers/Pastry.controller.js';

router.get('/pastryData', getPastryData);

export default router;