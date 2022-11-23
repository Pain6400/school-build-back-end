import mongoose from "mongoose"
const { Schema, model } = mongoose;

const CurrencySchema = new Schema({
    code: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        max: 3
    },
    name: {
        type: String,
        require: true,
        trim: true,
        max: 50
    }
});

export const Currency = model("Currency", CurrencySchema);