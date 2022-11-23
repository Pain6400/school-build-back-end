import mongoose from "mongoose";
const { Schema, model } = mongoose;

const StudentParentSchema = new Schema({
    studentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Student"
    },
    parentId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Parent"
    },
});

export const StudentParent = model("StudentParent", StudentParentSchema);