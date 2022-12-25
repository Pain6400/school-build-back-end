import { Class } from "../models/Class.js"
import { Class_Room } from "../models/Class_Room.js";
import { Student_Class } from "../models/Student_Class.js";

export const getClassRooms = async(req, res) => {
    try {
        const classRooms = await Class_Room.find().select({code: 1, capacity: 1, description: 1 });
        
        return res.status(200).json({ status: true, message: "Peticion Exitosa", classRooms});        
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message});
    }
}

export const createClassRoom = async(req, res) => {
    try {
        const { code, capacity, description } = req.body;
        const classRoom = new Class_Room({code, capacity, description});
         
        await classRoom.save();
        return res.status(200).json({ status: true, message: "Aula creada correctamente", classRoom});   
    } catch (error) {       
        return res.status(500).json({ status: false, message: error.message});
    }
}

export const getClassByScool = async(req, res) => {
    try {
        const { school_id } = req.params;
        const classes = await Class.find({ school_id: school_id }).exec();
        
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

export const getClassByStudent = async(req, res) => {
    try {
        const { student_id } = req.params;
        const classes = await Student_Class
                                .find({ student_id: student_id })
                                .populate({ path: "class_id", model: "Class", select: { school_id: 1, class_room_id: 1, teacher_id: 1, grade_id: 1, name: 1 }})
                                .select({ class_id: 1 });
        
        return res.status(200).json({ status: true, message: "Peticion Exitosa", classes});        
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message})
    }
}
