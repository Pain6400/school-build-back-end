import { Router } from "express";
import { createRole, createUserRole, deleteUserRole, getRole, getRoles, usuarioRoles, usuarioRolesByUserId } from "../controllers/role.controller.js";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyRolValidator, bodyUserRolValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
const router = Router();

router.get("/getRoles", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getRoles);
router.post("/CreateRole", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyRolValidator, createRole);
router.get("/getRole/:rolId", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), getRole);
router.get("/getUsersRoles", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), usuarioRoles)
router.get("/getRolesByUserId/:userId", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), usuarioRolesByUserId);
router.post("/createUserRole", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN]), bodyUserRolValidator, createUserRole);
router.delete("/deleteUserRoleById/:userRolId", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), bodyUserRolValidator, deleteUserRole);
export default router;