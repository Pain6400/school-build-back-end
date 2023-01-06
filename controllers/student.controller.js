import { Student } from "../models/Student.js";
import { Student_Class } from "../models/Student_Class.js";
import { Home_Work } from "../models/Home_Work.js";
import { bucket } from "../utils/storangeManager.js";
import { format } from "util";


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
  console.log(req.body.home_work_id)
    try {
        if (req.file) {
            return res.status(400).send({ message: "Please upload a file!" });
          }

          const blob = bucket.file(`test/${req.file.originalname}`);
          const blobStream = blob.createWriteStream({
            resumable: false,
          });

          blobStream.on("error", (err) => {
            return res.status(500).send({ message: err.message });
          });

          blobStream.on("finish", async () => {
            const publicUrl = format(
              `https://storage.googleapis.com/${bucket.name}/${blob.name}`
            );
      
            console.log(publicUrl);
      
            res.status(200).send({
              message: "Uploaded the file successfully: " + req.file.originalname,
              url: publicUrl,
            });
          });

          blobStream.end(req.file.buffer);

    } catch (error) {
        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
              message: "File size cannot be larger than 50MB!",
            });
          }
      
        return res.status(500).send({
            message: error.message,
        });
    }
}