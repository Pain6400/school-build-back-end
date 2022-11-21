import { IdentityUserRoles } from "../models/IdentityUserRoles.js";
import { Role } from "../models/Role.js"

export const getRoles = async(req, res) => {
    try {
        const roles = await Role.find();

        return res.status(200).json({ status: true, message: "Peticion Exitosa", roles}); 
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const createRole = async(req, res) => {
    try {
        const { name, description, uid} = req.body;

        const role = new Role({ name, description, uid });

        await role.save();
        return res.status(201).json({ status: true, message: "Rol creado correctamente", role })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const usuarioRoles = async(req, res) => {
    try {
        const roles = await IdentityUserRoles.find();

        return res.status(200).json({ status: true, message: "Peticion Exitosa", roles}); 
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const createUserRole = async(req, res) => {
    try {
        const { user_id, role_id } = req.body;
        const userRole = new IdentityUserRoles({ user_id, role_id });
        await userRole.save();
        return res.status(201).json({ status: true, message: "Role asignado a usuario correctamente", userRole })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}