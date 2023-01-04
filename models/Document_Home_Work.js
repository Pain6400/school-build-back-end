import mongoose from "mongoose";
import { Home_Work } from "./Home_Work";
const { Schema, model } = mongoose;

const DocumentHomeWorkSchema = new Schema({
    home_work_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Home_Work"
    },
    name: {
        type: String,
        require: true,
        trim: true,
        max: 50
    },
    url: {
        type: String,
        require: true,
        trim: true,
        max: 350
    },
    date_create: {
        type: Date,
        require: true
    }
});

HomeWorkSchema.pre("save", async function(next) {
    const params = this;

    try {
        const student = await Home_Work.findById(params.home_work_id);
        if(!student) throw new Error("La tarea no existe");
        
        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

export const Document_Home_Work = model("Document_Home_Work", DocumentHomeWorkSchema);