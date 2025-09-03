import mongoose, { Schema } from "mongoose";
const adminSchema = new Schema({
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
}, { timestamps: true });
export default mongoose.model("Admin", adminSchema);
