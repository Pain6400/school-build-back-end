import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassSchema = new Schema({
    ganderId: {
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
    middleName: {
        type: Number,
        require: true,
        trim: true,
        max: 50
    },
    lastName: {
        type: Number,
        require: true,
        trim: true,
        max: 50
    },
    birthDate: {
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
    joinDate: {
        type: Date,
        require: true
    }
});

export const Class = model("Class", ClassSchema);