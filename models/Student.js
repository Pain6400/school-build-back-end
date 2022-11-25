import mongoose from "mongoose";
import { User } from "./User.js";
import { Gender } from "./Gender.js";
const { Schema, model } = mongoose;

const StudentSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    gander_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Gender"
    },
    name: {
        type: Number,
        require: true,
        trim: true,
        max: 50
    },
    middle_name: {
        type: Number,
        require: true,
        trim: true,
        max: 50
    },
    last_name: {
        type: Number,
        require: true,
        trim: true,
        max: 50
    },
    birth_date: {
        type: Date,
        require: false
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
});

StudentSchema.pre("save", async function(next) {
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

export const Student = model("Student", StudentSchema);