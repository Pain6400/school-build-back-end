import { School } from "../models/School.js";

export const GetSchools = async(req, res) => {
    try {
        const schools = await School.find().exec();

        return res.status(202).json({ status: true, message: "peticion creada correctamente", schools});
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

export const CreateSchool = async(req, res) => {
    try {
        const { plan_id, name, description, address } = req.body;

        const school = new School({ plan_id, name, description, address });
    
        await school.save();

        return res.status(201).json({ status: true, message: "Escuela creada correctamente", school});
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}

export const updateStatusSchool = async(req, res) => {
    try {
        const { school_id } = req.params;

        let school = await School.findById(school_id);
        school.status = !school.status;

        await school.save();
        
        return res.status(201).json({ status: true, message: "Estado cambiado exitosamente"});
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message })
    }
}