import { Schema, model } from "mongoose";
const AnnouncementSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "Admin", required: true },
}, { timestamps: true });
export default model("Announcement", AnnouncementSchema);
