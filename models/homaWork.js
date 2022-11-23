import mongoose from "mongoose";
const { Schema, model } = mongoose;

const homeWorkSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    dateCreate: {
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
    dateFrom: {
        type: Date,
        require: true
    },
    dateTo: {
        type: Date,
        require: true
    }
});

export const homeWork = model("homeWork", homeWorkSchema);