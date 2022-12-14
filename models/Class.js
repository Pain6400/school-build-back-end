import mongoose from "mongoose";
import { Class_Room } from "./Class_Room.js"
import { School } from "./School.js";
import { Teacher } from "./Teacher.js";
import { Grade } from "./Grade.js";

const { Schema, model } = mongoose;

const ClassSchema = new Schema({
    school_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "School"
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
    grade_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Grade"
    },
    name: {
        type: String,
        require: true,
        trim: true,
        max: 50
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
        const school = await School.findById(params.school_id);
        if(!school) throw new Error("La escuela no existe");

        const classRoom = await Class_Room.findById(params.class_room_id);
        if(!classRoom) throw new Error("El aula no existe");
        
        const teacher = await Teacher.findById(params.teacher_id);
        if(!teacher) throw new Error("El maestro no existe");
        
        const grade = await Grade.findById(params.grade_id);
        if(!grade) throw new Error("El grado no existe");
        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

export const Class = model("Class", ClassSchema);