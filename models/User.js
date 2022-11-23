import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
const userShema = new mongoose.Schema({
    school_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "School"
    },
    account_number: {
        type: String,
        require: true,
        trim: true,
    },
    userName: {
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
    phoneNumber: {
        type: Number,
        require: true,
        trim: true,
    },
    dateBirth: {
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

userShema.pre("save", async function(next) {
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


userShema.methods.comparePassrowd = async function(candidatePassword) {
    return await bcryptjs.compare(candidatePassword, this.password);
}

export const User = mongoose.model('User', userShema);