import mongoose from "mongoose";
import { Class_Room } from "./Class_Room.js"
import { Teacher } from "./Teacher.js";
const { Schema, model } = mongoose;

const ClassSchema = new Schema({
    name: {
        type: Number,
        require: true,
        trim: true,
        max: 50
    },
    class_room_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "ClassRoom"
    },
    teacher_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Teacher"
    },
    description: {
        type: String,
        require: false,
        max: 250
    }
});

ClassSchema.pre("save", async function(next) {
    const params = this;

    try {
        const classRoom = await Class_Room.findById(params.class_room_id);
        if(!classRoom) throw new Error("El aula no existe");
        
        const teacher = await Teacher.findById(params.teacher_id);
        if(!teacher) throw new Error("El maestro no existe");
        
        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

export const Class = model("Class", ClassSchema);