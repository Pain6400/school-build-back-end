import mongoose from "mongoose";
const { Schema, model } = mongoose;

const linkSchema = new Schema({
    id: {
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
        trim: true,
        unique: true
    },
    uid: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }
});

export const Link = model("Role", linkSchema);