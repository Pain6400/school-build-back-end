import mongoose from "mongoose";
import { Student } from "./Student";
const { Schema, model } = mongoose;

const HomeWorkSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    date_create: {
        type: Date,
        require: true
    },
    content: {
        type: String,
        require: true,
        trim: true,
        max: 150
    },
    description: {
        type: String,
        require: true,
        trim: true,
        max: 250
    },
    Grade: {
        type: mongoose.Types.Decimal128,
        require: true,
        trim: true
    },
    date_from: {
        type: Date,
        require: true
    },
    date_to: {
        type: Date,
        require: true
    }
});

HomeWorkSchema.pre("save", async function(next) {
    const params = this;

    try {
        const student = await Student.findById(params.student_id);
        if(!student) throw new Error("El estudiante no existe");
        
        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

export const Home_Work = model("Home_Work", HomeWorkSchema);