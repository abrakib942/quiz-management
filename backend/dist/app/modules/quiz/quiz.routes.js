"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizRoutes = void 0;
const express_1 = __importDefault(require("express"));
const quiz_controller_1 = require("./quiz.controller");
const router = express_1.default.Router();
router.post('/create-quiz', quiz_controller_1.QuizController.createQuiz);
router.get('/:id', quiz_controller_1.QuizController.getSingleQuiz);
router.patch('/:id', quiz_controller_1.QuizController.updateQuiz);
router.delete('/:id', quiz_controller_1.QuizController.deleteQuiz);
router.get('/', quiz_controller_1.QuizController.getAllQuizzes);
exports.QuizRoutes = router;
