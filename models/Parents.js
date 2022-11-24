import mongoose from "mongoose";
const { Schema, model } = mongoose;

const ParentSchema = new Schema({
    gender_id: {
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

export const Parent = model("Parent", ParentSchema);