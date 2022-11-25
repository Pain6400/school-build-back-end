import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodySchoolValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { CreateSchool, GetSchools, updateStatusSchool } from "../controllers/school.controller.js";

const router = Router();

router.get("/getSchools", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), GetSchools)
router.post("/createSchool", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodySchoolValidator, CreateSchool);
router.get("/updateStatusSchool/:school_id", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), updateStatusSchool);

export default router;