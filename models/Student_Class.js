import mongoose from "mongoose";
import { Student } from "./Student.js"
import { Class } from "./Class.js"
const { Schema, model } = mongoose;

const StudentClassSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    class_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Class"
    },
    dateFrom: {
        type: Date,
        require: true
    },
    dateTo: {
        type: Date,
        require: true
    }
});

StudentClassSchema.pre("save", async function(next) {
    const params = this;

    try {
        const student = await Student.findById(params.student_id);
        if(!student) throw new Error("El estudiante no existe");
        
        const classO = await Class.findById(params.class_id);
        if(!classO) throw new Error("La clase no existe");
        
        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

export const Student_Class = model("Student_Class", StudentClassSchema);