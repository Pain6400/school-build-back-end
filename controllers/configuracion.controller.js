import { Currency } from "../models/Currency.js";
import { Plan } from "../models/Plan.js";
import { User_Type } from "../models/User_Type.js";

export const getUsersTypes = async(req, res) => {
    try {
        const usersTypes = await User_Type.find().exec();

        return res.status(200).json({ status: true, message: "Peticion Exitosa", usersTypes });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const createUserType = async(req, res) => {
    try {
        const { code, title, description } = req.body;
        const userType = new User_Type({ code, title, description });
        await userType.save();

        return res.status(201).json({ status: true, message: "Tipo de usuario creado correctamente", userType })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const createCurrency = async(req, res) => {
    try {
        const { code, name } = req.body;
        const userType = new Currency({ code, name });
        await userType.save();

        return res.status(201).json({ status: true, message: "Moneda creada correctamente", userType })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const createPlan = async(req, res) => {
    try {
        const { code, name, description, currency_id, price } = req.body;
        const userType = new Plan({ code, name, description, currency_id, price });
        await userType.save();

        return res.status(201).json({ status: true, message: "Plan creado correctamente", userType })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}