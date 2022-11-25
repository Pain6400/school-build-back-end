import mongoose from "mongoose"
import { Currency } from "./Currency.js";
const { Schema, model } = mongoose;

const PlanSchema = new Schema({
    code: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        max: 15
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
    currency_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Currency"
    },
    price: {
        type: mongoose.Types.Decimal128,
        require: true,
        trim: true
    }
});

PlanSchema.pre("save", async function(next) {
    const params = this;

    try {
        const currency = await Currency.findById(params.currency_id);
        if(!currency) throw new Error("La moneda no existe");

        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

export const Plan = model("Plan", PlanSchema);