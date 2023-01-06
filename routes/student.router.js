import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyDocumentHomeWorkValidator, bodyHomeWorkValidator, bodyStudentToClassValidator, bodyStudentValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { addStudentToClass, createHomeWork, createStudent, getStudentsByClass, getStudentsBySchool, uploadDocumentHomework } from "../controllers/student.controller.js";
import { processFileMiddleware } from "../utils/storangeManager.js";
const router = Router();

router.get("/getStudentsBySchool/:school_id", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), getStudentsBySchool);
router.get("/getStudentsByClass/:class_id", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), getStudentsByClass);
router.post("/createStudent", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), bodyStudentValidator, createStudent)
router.post("/addStudentToClass", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), bodyStudentToClassValidator, addStudentToClass)
router.post("/createHomeWork", requireToken,checkRoleAuth([ROLES_SETTING.TEACHER, ROLES_SETTING.SUPERADMIN]), bodyHomeWorkValidator, createHomeWork)
router.post("/uploadDocumentHomework", requireToken,checkRoleAuth([ROLES_SETTING.TEACHER, ROLES_SETTING.SUPERADMIN]), processFileMiddleware.single("file"), uploadDocumentHomework)
export default router;