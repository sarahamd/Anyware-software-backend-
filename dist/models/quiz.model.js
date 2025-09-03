import mongoose, { Schema } from "mongoose";
const quizSchema = new Schema({
    name: { type: String, required: true },
    course: { type: String, required: true },
    semester: { type: String, required: true },
    questions: [
        {
            questionText: { type: String, required: true },
            options: { type: [String], required: true },
            correctAnswerIndex: { type: Number, required: true },
        },
    ],
    dueDate: { type: Date, required: true },
}, { timestamps: true });
export default mongoose.model("Quiz", quizSchema);
