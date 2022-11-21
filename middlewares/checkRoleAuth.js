import { IdentityUserRoles } from "../models/IdentityUserRoles.js"


export const checkRoleAuth = (rolesAllow) => async(req, res, next) => {
    try {
        const userRoles = await IdentityUserRoles
                                .find({ user_id: req.uid })
                                .populate({ path: "role_id", model: "Role"})
                                .exec();

        if(!userRoles) return res.status(403).json({ status: false, message: "No tiene permisos"});

        const result = userRoles.map(role => rolesAllow.includes(role.role_id.name)).find(val => val === true);

        if(!result) return res.status(401).json({ status: false, message: "No tienes el rol requedido" })

        next();
    } catch (error) {
        return res.status(401).json({ status: false, message: error.message})
    }
}