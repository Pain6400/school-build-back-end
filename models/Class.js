import mongoose from "mongoose";
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

export const Class = model("Class", ClassSchema);