import { Router } from 'express';
const router = Router()

import { createUser, verifyJWT, savePastryToUser } from '../Controllers/User.controller.js';

router.post('/signUp', createUser);
router.post('/verifyToken', verifyJWT)
router.post('/savePastryToUser', savePastryToUser);
export default router