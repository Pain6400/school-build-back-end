import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassRoomSchema = new Schema({
    Code: {
        type: String,
        require: true,
        trim: true,
        max: 20
    },
    Capacity: {
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

export const ClassRoom = model("ClassRoom", ClassRoomSchema);