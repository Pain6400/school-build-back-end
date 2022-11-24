import mongoose from "mongoose";
const { Schema, model } = mongoose;

const TeacherShema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    gender_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Gender"
    },
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
    join_date: {
        type: Date,
        require: true
    }
})

export const Teacher = model("Teacher", TeacherShema);
