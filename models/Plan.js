import mongoose from "mongoose"
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
    currencyId: {
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

export const Plan = model("Plan", PlanSchema);