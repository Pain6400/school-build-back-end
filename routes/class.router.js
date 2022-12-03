import { Router } from "express";
import { checkRoleAuth } from "../middlewares/checkRoleAuth.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyClassRoomValidator, bodyClassValidator } from "../middlewares/validatorManager.js";
import { ROLES_SETTING } from "../config/roles_setting.js";
import { createClass, createClassRoom, getClassByScool, getClassRooms } from "../controllers/class.controller.js";

const router = Router();

router.get("/getClassRooms", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), getClassRooms);
router.post("/createClassRoom", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]),bodyClassRoomValidator, createClassRoom);
router.get("/getClassByScool/:school_id", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), getClassByScool);
router.post("/createClass", requireToken, checkRoleAuth([ROLES_SETTING.SUPERADMIN, ROLES_SETTING.ADMIN]), bodyClassValidator, createClass);

export default router;