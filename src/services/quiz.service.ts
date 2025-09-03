import Quiz, { QuizDoc } from "../models/quiz.model";
import { ValidationError } from "../errors/ValidationError";
import { NotFoundError } from "../errors/NotFoundError";
import { createQuizSchema, updateQuizSchema } from "../validations/quiz.validation";

class QuizService {
  async createQuiz(data: Partial<QuizDoc>): Promise<QuizDoc> {
    try {
      await createQuizSchema.validate(data, { abortEarly: false });
    } catch (err: any) {
      throw new ValidationError(err.errors || err.message);
    }

    const quiz = await Quiz.create(data);
    return quiz;
  }

  async getQuizzes(): Promise<QuizDoc[]> {
    const quizzes = await Quiz.find().sort({ createdAt: -1 });
    return quizzes;
  }

  async getQuizById(id: string): Promise<QuizDoc> {
    const quiz = await Quiz.findById(id);
    if (!quiz) {
      throw new NotFoundError("Quiz not found");
    }
    return quiz;
  }

  async updateQuiz(id: string, data: Partial<QuizDoc>): Promise<QuizDoc> {
    try {
      await updateQuizSchema.validate(data, { abortEarly: false });
    } catch (err: any) {
      throw new ValidationError(err.errors || err.message);
    }

    const updatedQuiz = await Quiz.findByIdAndUpdate(id, data, { new: true });
    if (!updatedQuiz) {
      throw new NotFoundError("Quiz not found");
    }

    return updatedQuiz;
  }

  async deleteQuiz(id: string): Promise<{ message: string }> {
    const deletedQuiz = await Quiz.findByIdAndDelete(id);
    if (!deletedQuiz) {
      throw new NotFoundError("Quiz not found");
    }
    return { message: "Quiz deleted successfully" };
  }
}

export default new QuizService();
