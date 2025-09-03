import { Router } from "express";
import * as quizController from "../controllers/quiz.controller";
import { requireAdmin } from "../middlewares/requireAdmin.middleware";


const router = Router();
router
  .route("/")
  .post(requireAdmin, quizController.createQuiz)
  .get(requireAdmin, quizController.getQuizzes);

router.route("/:id")
.get(requireAdmin, quizController.getQuizById)
.put(requireAdmin, quizController.updateQuiz)
.delete(requireAdmin, quizController.deleteQuiz);

export default router;
