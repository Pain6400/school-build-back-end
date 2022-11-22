import { Router } from "express";
import { createRole, createUserRole, deleteUserRole, getRoles, usuarioRoles, usuarioRolesByUserId } from "../controllers/role.controller.js";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyRolValidator, bodyUserRolValidator } from "../middlewares/validatorManager.js";

const router = Router();

router.get("/", requireToken, checkRoleAuth(["super_admin"]), getRoles);
router.get("/usuarioRoles", requireToken, checkRoleAuth(["super_admin", "admin"]), usuarioRoles)
router.get("/rolesByUserId/:userId", requireToken, checkRoleAuth(["super_admin", "admin"]), usuarioRolesByUserId);
router.post("/Create", requireToken, checkRoleAuth(["super_admin"]), bodyRolValidator, createRole);
router.post("/createUserRole", requireToken, checkRoleAuth(["super_admin"]), bodyUserRolValidator, createUserRole);
router.delete("/deleteUserRoleById/:userRolId", requireToken, checkRoleAuth(["super_admin", "admin"]), bodyUserRolValidator, deleteUserRole);
export default router;