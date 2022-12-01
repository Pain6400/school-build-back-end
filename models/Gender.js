import mongoose from "mongoose"
const { Schema, model } = mongoose;

const GenderSchema = new Schema({
    code: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        max: 1
    },
    description: {
        type: String,
        require: true,
        trim: true,
        max: 20
    },
});

export const Gender = model("Gender", GenderSchema);