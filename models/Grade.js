import mongoose from "mongoose";
const { Schema, model } = mongoose;

const GradeShema = new Schema({
    code: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        max: 10
    },
    name: {
        type: String,
        require: false,
        trim: true,
        max: 50
    },
    description: {
        type: String,
        require: false,
        trim: true,
        max: 250
    }
})

export const Grade = model("Grade", GradeShema);
