"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteQuiz = exports.updateQuiz = exports.getQuizById = exports.getQuizzes = exports.createQuiz = void 0;
const mongoose_1 = require("mongoose");
const quiz_validation_1 = require("../validations/quiz.validation");
const ValidationError_1 = require("../errors/ValidationError");
const quiz_service_1 = __importDefault(require("../services/quiz.service"));
// Create Quiz
const createQuiz = async (req, res, next) => {
    try {
        const validatedData = await quiz_validation_1.createQuizSchema.validate(req.body, {
            abortEarly: false,
        });
        const quiz = await quiz_service_1.default.createQuiz(validatedData);
        res.status(201).json({
            success: true,
            message: "Quiz created successfully",
            data: quiz,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createQuiz = createQuiz;
// Get All Quizzes
const getQuizzes = async (req, res, next) => {
    try {
        const quizzes = await quiz_service_1.default.getQuizzes();
        res.status(200).json({
            success: true,
            message: "Quizzes retrieved successfully",
            data: quizzes,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getQuizzes = getQuizzes;
// Get Quiz By ID
const getQuizById = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new ValidationError_1.ValidationError("Invalid quiz ID");
        }
        const quiz = await quiz_service_1.default.getQuizById(id);
        res.status(200).json({
            success: true,
            message: "Quiz retrieved successfully",
            data: quiz,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getQuizById = getQuizById;
// Update Quiz
const updateQuiz = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new ValidationError_1.ValidationError("Invalid quiz ID");
        }
        const validatedData = await quiz_validation_1.updateQuizSchema.validate(req.body, {
            abortEarly: false,
        });
        const quiz = await quiz_service_1.default.updateQuiz(id, validatedData);
        res.status(200).json({
            success: true,
            message: "Quiz updated successfully",
            data: quiz,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateQuiz = updateQuiz;
// Delete Quiz
const deleteQuiz = async (req, res, next) => {
    const { id } = req.params;
    try {
        if (!(0, mongoose_1.isValidObjectId)(id)) {
            throw new ValidationError_1.ValidationError("Invalid quiz ID");
        }
        await quiz_service_1.default.deleteQuiz(id);
        res.status(200).json({
            success: true,
            message: "Quiz deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteQuiz = deleteQuiz;
