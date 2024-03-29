import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import { School } from "./School.js";
import { User_Type } from "./User_Type.js"
const { Schema, model } = mongoose;
const UserShema = new Schema({
    school_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "School"
    },
    type_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User_Type"
    },
    account_number: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    user_name: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    name: {
        type: String,
        require: true,
        trim: true,
    },
    phone_number: {
        type: Number,
        require: true,
        trim: true,
    },
    date_birth: {
        type: Date,
        require: true,
        trim: true,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    picture: {
        type: String,
        require: false,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    status: {
        type: Boolean,
        require: true
    }
});

UserShema.pre("save", async function(next) {
    const params = this;

    try {
        const school = await School.findById(params.school_id);
        if(!school) throw new Error("La escuela no existe");

        const userType = await User_Type.findById(params.type_id);
        if(!userType) throw new Error("El tipo de usuario no existe");

        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

UserShema.pre("save", async function(next) {
    const user = this;

    if(!user.isModified("password")) return next();
    try {
        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(user.password, salt);
        user.password = hashPassword;
        next();
    } catch (error) {
        console.log(error);
        throw new Error("Fallo el hash de contraseña")
    }
});


UserShema.methods.comparePassrowd = async function(candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
}

export const User = model('User', UserShema);