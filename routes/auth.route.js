import { Router } from 'express';
import { login, refreshToken, logout } from '../controllers/auth.controller.js';

import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator } from '../middlewares/validatorManager.js';
const router = Router();

router.post('/login', bodyLoginValidator, login);

router.get("/refreshToken", requireRefreshToken, refreshToken);

router.get("/logour", logout)

export default router;