import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StudentClassSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    classId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Class"
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

export const StudentClass = model("StudentClass", StudentClassSchema);