import { User } from "../models/User.js";
import { generateToken, generateRefreshToken } from "../utils/tokenManager.js";

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        let user = await User
                        .findOne({email});
        if(!user) return res.status(403).json({ status: false, message: "El usuario no existe"});

        const respuestaPassword = await user.comparePassrowd(password);

        if(!respuestaPassword) return res.status(403).json({ status: false, message: "Contraseña incorrecta"});

        const token = generateToken(user.id)

        generateRefreshToken(user.uid, res);

        return res.json(
            { 
                status:true, 
                message: "Usuario logeado correctamente", 
                tokenInfo: token, 
                userInfo: { 
                    _id: user. _id, 
                    school_id: user.school_id,
                    type_id: user.type_id,
                    account_number: user.account_number,
                    user_name: user.user_name,
                    name: user.name,
                    phone_number: user.phone_number,
                    email: user.email
                }
            }
        );

    } catch (error) { 
        console.log(error)
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