import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyCurrencyTypeValidator, bodyPlanTypeValidator, bodyUserTypeValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { createCurrency, createGrade, createPlan, createUserType, getCurrencies, getGenders, getGrades, getPlans, getUsersTypes, updateGrade } from "../controllers/configuracion.controller.js";

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

//Grade
router.get("getGrades", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getGrades);
router.post("/createGrade",requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyPlanTypeValidator, createGrade);
router.patch("/updateGrade",requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyPlanTypeValidator, updateGrade);
export default router;