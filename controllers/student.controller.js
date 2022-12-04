import { Student } from "../models/Student.js";
import { Student_Class } from "../models/Student_Class.js";

export const getStudentsBySchool = async(req, res) => {
    try {
        const { school_id } = req.params;
        let students = await Student
                        .find()
                        .populate({ path: "user_id", model: "User", select: "school_id"})
                        .select({ name: 1, middle_name: 1, last_name: 1, email: 1, phone: 1, status:1 });

        students.filter(f => f.user_id.school_id == school_id && f.status == true);      

        return res.status(200).json({ status: true, message: "Peticion Exitosa", students });

    } catch (error) {
        return res.status(500).json({status: false, message: error.message});
    }
}

export const getStudentsByClass = async(req, res) => {
    try {
        const { class_id } = req.params;
        const students = await Student_Class
                    .find({ class_id: class_id })
                    .populate("Student")
                    .exec();

        return res.json({ status: false, message: "Estudiantes obtenidos correctamente", students })

    } catch (error) {
        return res.status(500).json({status: false, message: error.message});
    }
}

export const createStudent = async(req, res) => {
    try {
        const { user_id, gander_id, name, middle_name, last_name, birth_date, email, phone } = req.body;

        const student = new Student({ user_id, gander_id, name, middle_name, last_name, birth_date, email, phone, status: true, join_date: new Date()})

        await student.save();
        return res.json({ status: true, message: "Estudiante creado correctamente", student });
        
    } catch (error) {
        return res.status(500).json({status: false, message: error.message});
    }
}

export const addStudentToClass = async(req, res) => {
    try {
        const { student_id, class_id, dateFrom, dateTo } = req.body;

        const studentToClass = new Student_Class({ student_id, class_id, dateFrom, dateTo })

        await studentToClass.save();
        return res.json({ status: true, message: "Estudiante agregado a una clase correctamente", studentToClass });
        
    } catch (error) {
        return res.status(500).json({status: false, message: error.message});
    }
}