import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyCurrencyTypeValidator, bodyGenderValidator, bodyGradeValidator, bodyPlanTypeValidator, bodyUserTypeValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { createCurrency, createGender, createGrade, createPlan, createUserType, getCurrencies, getGenders, getGrades, getPlans, getUsersTypes, updateGrade } from "../controllers/configuracion.controller.js";

const router = Router();

//user type
router.get("/GetUsersTypes", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getUsersTypes)
router.post("/CreateUserType", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyUserTypeValidator, createUserType);

//currency
router.get("/getCurrencies", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getCurrencies)
router.post("/CreatCurrency", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyCurrencyTypeValidator, createCurrency);

//plan
router.get("/getPlans", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getPlans)
router.post("/CreatPlan",requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyPlanTypeValidator, createPlan);

//gender
router.get("/getGenders", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getGenders);
router.post("/createGender", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyGenderValidator, createGender)

//Grade
router.get("/getGrades", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), getGrades);
router.post("/createGrade",requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), bodyGradeValidator, createGrade);
router.patch("/updateGrade",requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), bodyPlanTypeValidator, updateGrade);


export default router;