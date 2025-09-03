
import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
    name: string;
    email: string;
    avatar?: string;
    password: string;
    haveFullControl: boolean;
}

const adminSchema = new Schema<IAdmin>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
        },
    
        avatar: {
            type: String,
            default: "default_avatar.jpg",
        },
        password: {
            type: String,
            required: [true, "Password is required"],
        },
        haveFullControl: {
            type: Boolean,
            default: false,
        },

    },
    { timestamps: true }
);

export default mongoose.model<IAdmin>("Admin", adminSchema);