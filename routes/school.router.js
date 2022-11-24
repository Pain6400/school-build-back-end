import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodySchoolValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { CreateSchool } from "../controllers/school.controller.js";

const router = Router();

router.post("/CreateSchool", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodySchoolValidator, CreateSchool);

export default router;