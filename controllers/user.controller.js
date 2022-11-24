import { User } from "../models/User.js";
import { nanoid } from "nanoid";
import { Identity_User_Roles } from "../models/Identity_User_Roles.js";
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js";
export const register = async (req, res) => {
    const { 
            school_id, type_id, user_name,name,
            phone_number,date_birth,email, picture,
            password 
        } = req.body;
 
    try {
        let user = await User.findOne({email});
        if(user) throw { code: 1100};
        user = new User({ 
            school_id, type_id, account_number: nanoid(6), user_name,name,
            phone_number, date_birth,email, picture,
            password, status: true  
        });
        
        await user.save();

        const token = generateToken(user.id)

        generateRefreshToken(user.uid, res);

        return res.status(201).json({ status: true, message: "Usuario creado correctamente", token });
    } catch (error) {
        if(error.code === 1100) {
            return res.status(400).json({status: false, message: "El correo ya existe"})
        }

        return res.status(500).json({status: false, message: error.message})
    }
}

export const Users = async(req, res) => {
    try {
        const  { _id ,school_id, type_id, user_name,name, phone_number,date_birth,email, picture } = await User.find().exec();
        
        return res.json(
            { 
                status: false, 
                message: "Usuarios obtenidos correctamente", 
                userInfo: { _id ,school_id, type_id, user_name,name,phone_number,date_birth,email, picture }
            })
    } catch (error) {
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}

export const infoUser = async(req, res) => {
    try {
        const  { _id ,school_id, type_id, user_name,name, phone_number,date_birth,email, picture  } = await User.findById(req.uid).lean();
        return res.json({ 
            status: true, 
            message: "Usuario obtenido correctamente", 
            userInfo: { _id ,school_id, type_id, user_name,name, phone_number,date_birth,email, picture }
        })
    } catch (error) {
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}

export const getUsersByRole = async(req, res) => {
    try {
        const { rolId } = req.params;
        const roles = await Identity_User_Roles
                            .find({role_id: rolId})
                            .populate({ path: "user_id", model: "User"})
                            .exec();

        const usuarios = roles.map(x => (
             {
                "user_id": x.user_id._id,
                "email": x.user_id.email,
                "user_name": x.user_id.user_name,
                "name": x.user_id.name
            }
        ));

        return res.json({ status: false, message: "Usuarios obtenidos correctamente", usuarios })
    } catch (error) {
        return res.status(500).json({status: false, message: error.message})
    }
}

export const update = async (req, res) => {
    const { 
            name,phone_number, email, picture, date_birth
        } = req.body;
 
    const { userId } = req.params
    try {

        let user = await User.findById(userId);

        if(!user) return res.status(404).json({ status: false, message: "El usuario no existe"})

        if(!user._id.equals(req.uid)) return res.status(401).json({ status: false, message: "No esta autorizado"});
        user.name = name;
        user.phone_number = phone_number;
        user.email = email;
        user.picture = picture;
        user.date_birth = date_birth;

        await user.save();

        return res.status(200).json({ status: true, message: "User actualizado correctamente"});
    } catch (error) {
        if(error.code === 1100) {
            return res.status(400).json({status: false, message: "El correo ya existe"})
        }

        return res.status(500).json({status: false, message: error.message})
    }
}

export const updateAdmin = async (req, res) => {
    const { 
            name,phone_number, email, picture, date_birth
        } = req.body;
 
    const { userId } = req.params
    try {

        let user = await User.findById(userId);

        if(!user) return res.status(404).json({ status: false, message: "El usuario no existe"})

        user.name = name;
        user.phone_number = phone_number;
        user.email = email;
        user.picture = picture;
        user.date_birth = date_birth;

        await user.save();

        return res.status(200).json({ status: true, message: "User actualizado correctamente"});
    } catch (error) {
        if(error.code === 1100) {
            return res.status(400).json({status: false, message: "El correo ya existe"})
        }

        return res.status(500).json({status: false, message: error.message})
    }
}

export const changeStaus = async (req, res) => {
    const { 
            status
        } = req.body;
 
    const { userId } = req.params
    try {

        let user = await User.findById(uid);

        if(!user) return res.status(404).json({ status: false, message: "El usuario no existe"})

        user.status = status;

        await user.save();
        
        return res.status(200).json({ status: true, message: status ? "User activado": "User desactivado" });
    } catch (error) {
        if(error.code === 1100) {
            return res.status(400).json({status: false, message: "El correo ya existe"})
        }

        return res.status(500).json({status: false, message: error.message})
    }
}

