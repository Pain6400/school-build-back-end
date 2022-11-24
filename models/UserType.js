import mongoose from "mongoose";
const { Schema, model } = mongoose;

const UserTypeSchema = new Schema({
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

export const UserType = model("UserType", UserTypeSchema);