import mongoose from "mongoose";
const { Schema, model } = mongoose;

const HomeWorkSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    date_create: {
        type: Date,
        require: true
    },
    content: {
        type: String,
        require: true,
        trim: true,
        max: 150
    },
    description: {
        type: String,
        require: true,
        trim: true,
        max: 250
    },
    Grade: {
        type: mongoose.Types.Decimal128,
        require: true,
        trim: true
    },
    date_from: {
        type: Date,
        require: true
    },
    date_to: {
        type: Date,
        require: true
    }
});

export const Home_Work = model("Home_Work", HomeWorkSchema);