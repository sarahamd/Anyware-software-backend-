"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const quiz_model_1 = __importDefault(require("../models/quiz.model"));
const ValidationError_1 = require("../errors/ValidationError");
const NotFoundError_1 = require("../errors/NotFoundError");
const quiz_validation_1 = require("../validations/quiz.validation");
class QuizService {
    async createQuiz(data) {
        try {
            await quiz_validation_1.createQuizSchema.validate(data, { abortEarly: false });
        }
        catch (err) {
            throw new ValidationError_1.ValidationError(err.errors || err.message);
        }
        const quiz = await quiz_model_1.default.create(data);
        return quiz;
    }
    async getQuizzes() {
        const quizzes = await quiz_model_1.default.find().sort({ createdAt: -1 });
        return quizzes;
    }
    async getQuizById(id) {
        const quiz = await quiz_model_1.default.findById(id);
        if (!quiz) {
            throw new NotFoundError_1.NotFoundError("Quiz not found");
        }
        return quiz;
    }
    async updateQuiz(id, data) {
        try {
            await quiz_validation_1.updateQuizSchema.validate(data, { abortEarly: false });
        }
        catch (err) {
            throw new ValidationError_1.ValidationError(err.errors || err.message);
        }
        const updatedQuiz = await quiz_model_1.default.findByIdAndUpdate(id, data, { new: true });
        if (!updatedQuiz) {
            throw new NotFoundError_1.NotFoundError("Quiz not found");
        }
        return updatedQuiz;
    }
    async deleteQuiz(id) {
        const deletedQuiz = await quiz_model_1.default.findByIdAndDelete(id);
        if (!deletedQuiz) {
            throw new NotFoundError_1.NotFoundError("Quiz not found");
        }
        return { message: "Quiz deleted successfully" };
    }
}
exports.default = new QuizService();
