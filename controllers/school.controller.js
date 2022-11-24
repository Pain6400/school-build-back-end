import { School } from "../models/School.js";

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