import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StudentParentSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    parent_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Parent"
    },
});

export const Student_Parent = model("Student_Parent", StudentParentSchema);