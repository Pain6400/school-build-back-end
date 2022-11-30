import { Class } from "../models/Class.js";
import { Teacher } from "../models/Teacher.js";


export const getTeacherByClass = async(req, res) => {
    try {
        const { class_id } = req.params;
        const teachers = await Class
                    .find({ class_id: class_id})
                    .populate({ path: "teacher_id", model: "Teacher"})
                    .exec()
                    .map(item => {
                        item.teacher_id.name
                    });

        console.log(teachers)
        return res.status(200).json({ status: true, message: "Peticion Exitosa", teachers });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}

export const createTeacher = async(req, res) => {
    try {
        const { user_id, gender_id, identidad, name, email, phone, join_date } = req.body;
        const teacher = Teacher({ user_id, gender_id, identidad, name, email, phone, status: true, join_date });

        await teacher.save();

        return res.json({ status: false, message: "Maestro creado correctamente", teacher });
    } catch (error) {
        return res.status(500).json({ status: false, message: error.message });
    }
}