import mongoose from "mongoose";
const { Schema, model } = mongoose;

const RoleSchema = new Schema({
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