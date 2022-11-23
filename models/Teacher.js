import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TeacherShema = new Schema({
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
    genderId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Gender"
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    phone: {
        type: Number,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    status: {
        type: Boolean,
        require: true,
    },
    joinDate: {
        type: Date,
        require: true
    }
})

export const Teacher = model("Teacher", TeacherShema);
