import { NextFunction, Request, Response } from "express";
import { isValidObjectId } from "mongoose";

import {
  createQuizSchema,
  updateQuizSchema,
} from "../validations/quiz.validation";
import { ValidationError } from "../errors/ValidationError";
import quizService from "../services/quiz.service";

// Create Quiz
export const createQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const validatedData = await createQuizSchema.validate(req.body, {
      abortEarly: false,
    });
    const quiz = await quizService.createQuiz(validatedData);
    res.status(201).json({
      success: true,
      message: "Quiz created successfully",
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

// Get All Quizzes
export const getQuizzes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const quizzes = await quizService.getQuizzes();
    res.status(200).json({
      success: true,
      message: "Quizzes retrieved successfully",
      data: quizzes,
    });
  } catch (error) {
    next(error);
  }
};

// Get Quiz By ID
export const getQuizById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      throw new ValidationError("Invalid quiz ID");
    }
    const quiz = await quizService.getQuizById(id);
    res.status(200).json({
      success: true,
      message: "Quiz retrieved successfully",
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

// Update Quiz
export const updateQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      throw new ValidationError("Invalid quiz ID");
    }

    const validatedData = await updateQuizSchema.validate(req.body, {
      abortEarly: false,
    });

    const quiz = await quizService.updateQuiz(id, validatedData);
    res.status(200).json({
      success: true,
      message: "Quiz updated successfully",
      data: quiz,
    });
  } catch (error) {
    next(error);
  }
};

// Delete Quiz
export const deleteQuiz = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) {
      throw new ValidationError("Invalid quiz ID");
    }
    await quizService.deleteQuiz(id);
    res.status(200).json({
      success: true,
      message: "Quiz deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
