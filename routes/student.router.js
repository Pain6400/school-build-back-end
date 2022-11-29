import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import {  } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";

const router = Router();

router.get("/getStudentsByClass/:class_id", requireToken, requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]));

export default router;