import { Student } from "../models/Student.js";
import { Student_Class } from "../models/Student_Class.js";
import { Home_Work } from "../models/Home_Work.js";
import { User } from "../models/User.js";
import { uploadDocumentToStorange } from "../utils/uploadFileManager.js";
export const getStudentsBySchool = async(req, res) => {
    try {
        const { school_id } = req.params;
        let students = await Student
                        .find()
                        .populate({ path: "user_id", model: "User", select: "school_id"})
                        .select({ name: 1, middle_name: 1, last_name: 1, email: 1, phone: 1, status:1 });

         students = students.filter(f => f.user_id.school_id == school_id && f.status == true);      

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
                    .populate(
                        { 
                            path: "student_id", 
                            model: "Student", 
                            select: { name: 1, middle_name: 1, last_name: 1, email: 1, phone: 1 }
                        })
                    .select({class_id: 1, dateFrom: 1, dateTo: 1 });
                    
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

export const createHomeWork = async(req, res) => {
    try {
        const { student_id, title, description, grade, date_create, date_from, date_to } = req.body;

        const homeWork = new Home_Work({ student_id, title, description, grade, date_create, date_from, date_to })

        await homeWork.save();
        return res.json({ status: true, message: "Tarea creada correctamente", homeWork });
        
    } catch (error) {
        return res.status(500).json({status: false, message: error.message});
    }
}

export const uploadDocumentHomework = async(req, res) => {
    try {
        const { home_work_id } = req.body;
        const path = await ObtenerRutaTarea(home_work_id)
        const file = await uploadDocumentToStorange(path, req);

        if(file.status) {
            return res.json({ status: true, message: "Tarea creada correctamente", path: file.path });
        }
        
        return file;
    } catch (error) {
        return res.status(500).json({status: false, message: error.message});
    }
}

async function ObtenerRutaTarea(idTarea) {
    const { student_id:  { user_id, name } } = await Home_Work
                    .findById(idTarea)
                    .populate({
                        path: "student_id",
                        model: "Student",
                        select: { user_id: 1, name: 1 }
                    }).select({ user_id: 1, name: 1});

    const {school_id}  = await User
                        .findById(user_id)
                        .populate({
                            path: "school_id",
                            model: "School",
                            select: { school_id: 1, name: 1 }
                        })
                        .exec();
    
    return `${school_id.name}/${name}/${idTarea}`;
}