import mongoose from "mongoose";
import { Plan } from "./Plan.js";
const { Schema, model } = mongoose;

const SchoolShema = new Schema({
    plan_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Plan"
    },
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
    },
    status: {
        type: Boolean,
        require: true
    }
})

SchoolShema.pre("save", async function(next) {
    const params = this;

    try {
        const plan = await Plan.findById(params.plan_id);
        if(!plan) throw new Error("El plan no existe");

        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

export const School = model("School", SchoolShema);
