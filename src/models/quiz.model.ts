import mongoose, { Document, Schema } from "mongoose";

export interface QuizDoc extends Document {
  name: string;
  course: string;
  semester: string;
  questions: Array<{
    questionText: string;
    options: string[];
    correctAnswerIndex: number;
  }>;
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
}


const quizSchema = new Schema<QuizDoc>(
  {
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
  },
  { timestamps: true }
);

export default mongoose.model<QuizDoc>("Quiz", quizSchema);
