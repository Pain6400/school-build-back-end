import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import {  } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { createTeacher, getTeacherByClass } from "../controllers/teacher.controller.js";

const router = Router();

router.get("/getTechearsByClass/:class_id", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getTeacherByClass);
router.post("/createTeacher", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), createTeacher);

export default router();