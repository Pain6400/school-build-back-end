import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyTeacherValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { createTeacher, getTeacherByClass } from "../controllers/teacher.controller.js";

const router = Router();

router.get("/getTechearsByClass/:class_id", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getTeacherByClass);
router.post("/createTeacher", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyTeacherValidator, createTeacher);

export default router;