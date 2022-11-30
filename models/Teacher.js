import mongoose from "mongoose";
import { User } from "./User.js";
import { Gender } from "./Gender.js";
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
    identidad: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        max: 13,
        min: 13
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

TeacherShema.pre("save", async function(next) {
    const params = this;

    try {
        const user = await User.findById(params.user_id);
        if(!user) throw new Error("El usuario no existe");
        
        const gender = await Gender.findById(params.gander_id);
        if(!gender) throw new Error("El genero no existe");
        
        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

export const Teacher = model("Teacher", TeacherShema);
