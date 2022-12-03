import { Teacher } from "../models/Teacher.js";


export const getTeacherBySchool = async(req, res) => {
    try {
        const { school_id } = req.params;
        const teachers = await Teacher
                    .find()
                    .populate({ path: "user_id", model: "User", select: "school_id"})
                    .select({ gender_id: 1, identidad: 1, name: 1, email: 1, phone: 1, status: 1});

        const teachersFiller = teachers.filter(f => f.user_id.school_id == school_id && f.status == true);      

        return res.status(200).json({ status: true, message: "Peticion Exitosa", teachersFiller });
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