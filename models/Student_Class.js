import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StudentClassSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    class_id: {
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

export const Student_Class = model("Student_Class", StudentClassSchema);