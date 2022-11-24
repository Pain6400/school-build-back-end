import mongoose from "mongoose";
import { User } from "./User.js"
import { Role } from "./Role.js"
const { Schema, model } = mongoose;

const IdentityUserRolesSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "User"
    },
    role_id: {
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Role"
    }
});

IdentityUserRolesSchema.pre("save", async function(next) {
    const userRole = this;

    try {
        const user = await User.findById(userRole.user_id);
        if(!user) throw new Error("El usuario no existe");

        const role = await Role.findById(userRole.role_id);
        if(!role) throw new Error("El rol no existe");

        next();
    } catch (error) {
        throw new Error(error.message)
    }
});

IdentityUserRolesSchema.index({ user_id: 1, role_id: 1  }, { unique: true });

export const Identity_User_Roles = model("Identity_User_Roles", IdentityUserRolesSchema)