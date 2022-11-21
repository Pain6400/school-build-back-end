import { User } from "../models/User.js";
import { nanoid } from "nanoid";
import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";

export const register = async (req, res) => {
    const { 
            school_id, userName,name,
            phoneNumber,dateBirth,email, picture,
            password 
        } = req.body;
 
    try {
        let user = await User.findOne({email});
        if(user) throw { code: 1100};
        user = new User({ 
            school_id, account_number: nanoid(6), userName,name,
            phoneNumber, dateBirth,email, picture,
            password  
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

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({email});

        if(!user) return res.status(403).json({ status: false, message: "El usuario no existe"});

        const respuestaPassword = await user.comparePassrowd(password);

        if(!respuestaPassword) return res.status(403).json({ status: false, message: "Contraseña incorrecta"});

        const token = generateToken(user.id)

        generateRefreshToken(user.uid, res);

        return res.json({ strtus:true, message: "Usuario logeado correctamente", tokenInfo: token});

    } catch (error) { 
        console.log(error)
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}


export const infoUser = async(req, res) => {
    try {
        const  { _id , school_id, userName, name, phoneNumber, dateBirth, email  } = await User.findById(req.uid).lean();
        return res.json({ status: false, message: "El usuario no existe", userInfo: { _id , school_id, userName, name, phoneNumber, dateBirth, email }})
    } catch (error) {
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
}

export const refreshToken = (req, res) => {
    try {
        const { token, expiresIn } = generateToken(req.uid);
        return res.json({ token, expiresIn });
    } catch (error) {
        console.log(error);
        return res.status(500).json({status: false, message: "Error de servidor"})
    }
};

export const logout = (req, res) => {
    res.clearCookie("refreshToken");
    return res.json({ status:true, message: "Sesion cerrada correctamente"});
}