import mongoose, { Document, ObjectId, Schema, model } from "mongoose";

export interface AnnouncementDoc extends Document {
  title: string;
  description: string;
  course: string;
  semester: string;
  user: mongoose.Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const AnnouncementSchema = new Schema<AnnouncementDoc>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    user: { type:Schema.Types.ObjectId, ref: "Admin", required: true },
  },
  { timestamps: true }
);

export default model<AnnouncementDoc>("Announcement", AnnouncementSchema);
