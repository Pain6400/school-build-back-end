import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassRoomSchema = new Schema({
    schoolId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "School"
    },
    classRoomCode: {
        type: String,
        require: true,
        trim: true,
        max: 20
    },
    classRoomCapacity: {
        type: Number,
        require: true,
        trim: true
    }
});

export const ClassRoom = model("ClassRoom", ClassRoomSchema);