import mongoose from "mongoose";
import { Student } from "./Student.js";
import { Parent } from "./Parents.js";

const { Schema, model } = mongoose;

const StudentParentSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Parent"
    },
});

StudentParentSchema.pre("save", async function(next) {
    const params = this;

    try {
        const student = await Student.findById(params.student_id);
        if(!student) throw new Error("El estudiante no existe");
        
        const padre = await Parent.findById(params.gander_id);
        if(!padre) throw new Error("El padre no existe");
        
        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

export const Student_Parent = model("Student_Parent", StudentParentSchema);