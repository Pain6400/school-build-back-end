import { Class } from "../models/Class.js"

export const getClassByScool = async(req, res) => {
    try {
        const { school_id } = req.params;
        const classes = await Class.find({ school_id: school_id })
        
        return res.status(200).json({ status: true, message: "Peticion Exitosa", classes});        
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}

export const createClass = async(req, res) => {
    try {
        const { school_id, class_room_id, teacher_id, grade_id, name, description } = req.body;
        const classObject = new Class({school_id, class_room_id, teacher_id, grade_id, name, description })
         
        await classObject.save();
        return res.status(200).json({ status: true, message: "Clase creada correctamente", classObject});        
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}