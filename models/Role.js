import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RoleSchema = new Schema({
    code: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        require: true,
        trim: true
    }
});


export const Role = model("Role", RoleSchema);