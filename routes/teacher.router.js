import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyTeacherValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { createTeacher, getTeacherBySchool } from "../controllers/teacher.controller.js";

const router = Router();

router.get("/getTechearsBySchool/:school_id", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getTeacherBySchool);
router.post("/createTeacher", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyTeacherValidator, createTeacher);

export default router;