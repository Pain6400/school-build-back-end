import { Student_Class } from "../models/Student_Class.js";

export const getStudentsByClass = async(req, res) => {
    try {
        const { class_id } = req.params;
        const students = await Student_Class
                    .find({ class_id: class_id })
                    .populate("Student")
                    .exec();
        console.log(students);

        return res.json({ status: false, message: "Estudiantes obtenidos correctamente", students })

    } catch (error) {
        return res.status(500).json({status: false, message: error.message})
    }
}