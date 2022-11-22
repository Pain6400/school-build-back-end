import { Router } from 'express';
import { infoUser, login, register, refreshToken, logout, update, updateAdmin, changeStaus } from '../controllers/auth.controller.js';
import { requireToken } from '../middlewares/requireToken.js';
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireRefreshToken } from '../middlewares/requireRefreshToken.js';
import { bodyLoginValidator, bodyRegisterValidator, bodyUpdateValidator } from '../middlewares/validatorManager.js';
const router = Router();

router.post('/login', bodyLoginValidator, login);

router.post('/register', requireToken, checkRoleAuth(["super_admin", "admin"]), bodyRegisterValidator, register);

router.patch('/update/:userId', requireToken, bodyUpdateValidator, update);

router.patch('/updateAdmin/:userId', requireToken, checkRoleAuth(["super_admin", "admin"]), bodyUpdateValidator, updateAdmin);

router.patch("/changeStaus/:userId", requireToken, checkRoleAuth(["super_admin", "admin"]), changeStaus);

router.get("/userInfoById", requireToken, infoUser);

router.get("/refreshToken", requireRefreshToken, refreshToken);

router.get("/logour", logout)

export default router;