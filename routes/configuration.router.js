import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyCurrencyTypeValidator, bodyPlanTypeValidator, bodyUserTypeValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { createCurrency, createPlan, createUserType } from "../controllers/configuracion.controller.js";

const router = Router();

router.post("/CreateUserType", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyUserTypeValidator, createUserType);
router.post("/CreatCurrency", requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyCurrencyTypeValidator, createCurrency);
router.post("/CreatPlan",requireToken,checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyPlanTypeValidator, createPlan);

export default router;