import { Currency } from "../models/Currency.js";
import { Plan } from "../models/Plan.js";
import { User_Type } from "../models/User_Type.js";
import { Gender } from "../models/Gender.js";
import { Grade } from "../models/Grade.js";

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

export const getCurrencies = async(req, res) => {
    try {
        const currencies = await Currency.find().exec();

        return res.status(201).json({ status: true, message: "Peticion exitosa", currencies })
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

export const getPlans = async(req, res) => {
    try {
        const plans = await Plan.find().exec();

        return res.status(201).json({ status: true, message: "Peticion exitosa", plans })
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

export const getGenders = async(req, res) => {
    try {
        const genders = await Gender.find().exec();

        return res.status(200).json({ status: true, message: "Peticion Exitosa", genders });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const createGender = async(req, res) => {
    try {
        const { code, description } = req.body;
        const gender = new Gender({ code, description });
        await gender.save();

        return res.status(201).json({ status: true, message: "Genero creado correctamente", gender })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}


export const getGrades = async(req, res) => {
    try {
        const gredes = await Grade.find().exec();

        return res.status(200).json({ status: true, message: "Peticion Exitosa", gredes });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const createGrade = async(req, res) => {
    try {
        const { code, name, description } = req.body;
        const grade = new Grade({ code, name, description });
        await grade.save();

        return res.status(201).json({ status: true, message: "Grado creado correctamente", grade })
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const updateGrade = async (req, res) => {
    try {
        const { grade_id } = req.params;
        const { name, description } = req.body;

        let grade = await Grade.findById(grade_id);

        if(!grade) return res.status(404).json({ status: false, message: "El grado no existe"})
        
        grade.name = name;
        grade.description = description;

        await grade.save();

        return res.status(200).json({ status: true, message: "Grado actualizado correctamente"});
    } catch (error) {
        if(error.kind === "ObjectId") {
            return res.status(403).json({status: false, message: "Formato incorrecto"})
        }

        return res.status(500).json({status: false, message: error.message})
    }
}