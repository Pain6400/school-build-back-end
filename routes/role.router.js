import { Router } from "express";
import { createRole, createUserRole, getRoles, usuarioRoles } from "../controllers/role.controller.js";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyRolValidator, bodyUserRolValidator } from "../middlewares/validatorManager.js";

const router = Router();

router.get("/", requireToken, checkRoleAuth(["super_admin"]), getRoles);
router.post("/Create", requireToken, checkRoleAuth(["super_admin"]), bodyRolValidator, createRole);
router.get("/usuarioRoles", requireToken, checkRoleAuth(["super_admin"]), usuarioRoles)
router.post("/createUserRole", requireToken, checkRoleAuth(["super_admin"]), bodyUserRolValidator, createUserRole);

export default router;