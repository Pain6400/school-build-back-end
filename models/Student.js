import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ClassSchema = new Schema({
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

export const Class = model("Class", ClassSchema);