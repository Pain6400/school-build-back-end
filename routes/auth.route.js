import { Router } from 'express';
import { infoUser, login, register, refreshToken, logout } from '../controllers/auth.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator } from '../middlewares/validatorManager.js';
const router = Router();

router.post('/login', bodyLoginValidator, login);

router.post('/register', requireToken, checkRoleAuth(["super_admin", "admin"]), bodyRegisterValidator, register)

router.get("/userInfoById", requireToken, infoUser);

router.get("/refreshToken", requireRefreshToken, refreshToken);

router.get("/logour", logout)

export default router;