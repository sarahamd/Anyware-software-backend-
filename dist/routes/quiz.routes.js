import { Router } from "express";
import * as quizController from "../controllers/quiz.controller";
const router = Router();
router.post("/", quizController.createQuiz);
router.get("/", quizController.getQuizzes);
router.get("/:id", quizController.getQuizById);
router.put("/:id", quizController.updateQuiz);
router.delete("/:id", quizController.deleteQuiz);
export default router;
