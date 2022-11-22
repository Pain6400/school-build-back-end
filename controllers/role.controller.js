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

export const getRole = async(req, res) => {
    try {
        const { rolId } = req.params;
        const role = await Role.findById(rolId);

        return res.status(200).json({ status: true, message: "Peticion Exitosa", role}); 
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

export const usuarioRolesByUserId = async(req, res) => {
    try {
        const { userId } = req.params;
        const roles = await IdentityUserRoles.find({user_id: userId});

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

export const deleteUserRole = async(req, res) => {
    try {
        const { userRolId } = req.params;
        const userRole = IdentityUserRoles.findById(userRolId);
        if(!userRole) return res.status(403).json({ status: false, message: "El rol no existe" }); 

        await userRole.remove();
        return res.status(201).json({ status: true, message: "Role eliminado correctamente" })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}