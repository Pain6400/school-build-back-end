import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserTypeSchema = new Schema({
    code: {
        type: String,
        require: true,
        trim: true,
        max: 3,
        unique: true
    },
    title: {
        type: String,
        require: true,
        trim: true,
        max: 50
    },
    description: {
        type: String,
        require: false,
        trim: true,
        max: 250
    }
});

export const User_Type = model("User_Type", UserTypeSchema);