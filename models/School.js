import mongoose from "mongoose";
const { Schema, model } = mongoose;

const SchoolShema = new Schema({
    name: {
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
    },
    address: {
        type: String,
        require: false,
        trim: true,
        max: 150
    }
})

export const School = model("School", SchoolShema);
