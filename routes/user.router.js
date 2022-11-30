import { Router } from 'express';
import { requireToken } from '../middlewares/requireToken.js';
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { bodyRegisterValidator, bodyUpdateValidator } from '../middlewares/validatorManager.js';
import { changeStaus, getAllUsers, getUsersByRole, infoUser, register, update, updateAdmin } from '../controllers/user.controller.js';
import { ROLES_SETTING } from '../config/roles_setting.js';

const router = Router();

router.get("/getAllUsers", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getAllUsers)
router.post('/register', requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), bodyRegisterValidator, register);
router.get("/userInfoById/:roleId", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), infoUser);
router.get("/getUsersByRole/:rolId", requireToken, requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), getUsersByRole);
router.patch('/update/:userId', requireToken, bodyUpdateValidator, update);
router.patch('/updateAdmin/:userId', requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), bodyUpdateValidator, updateAdmin);
router.patch("/changeStaus/:userId", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), changeStaus);

export default router;