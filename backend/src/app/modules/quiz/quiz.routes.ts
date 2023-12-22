import express from 'express';
import { QuizController } from './quiz.controller';

const router = express.Router();

router.post('/create-quiz', QuizController.createQuiz);
router.get('/:id', QuizController.getSingleQuiz);
router.patch('/:id', QuizController.updateQuiz);
router.delete('/:id', QuizController.deleteQuiz);

router.get('/', QuizController.getAllQuizzes);

export const QuizRoutes = router;
