import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassRoomSchema = new Schema({
    code: {
        type: String,
        require: true,
        trim: true,
        max: 20
    },
    capacity: {
        type: Number,
        require: true,
        trim: true
    },
    description: {
        type: String,
        require: false,
        max: 250
    }
});

export const Class_Room = model("Class_Room", ClassRoomSchema);