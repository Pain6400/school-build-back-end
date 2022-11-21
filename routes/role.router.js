import { Router } from "express";
import { createRole, createUserRole, getRoles, usuarioRoles } from "../controllers/role.controller.js";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyRolValidator, bodyUserRolValidator } from "../middlewares/validatorManager.js";

const router = Router();

router.get("/", requireToken, checkRoleAuth(["super_admin", "student"]), getRoles);
router.post("/Create", bodyRolValidator, createRole);
router.get("/usuarioRoles", usuarioRoles)
router.post("/createUserRole", bodyUserRolValidator, createUserRole);

export default router;