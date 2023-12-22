import express from 'express';

const router = express.Router();

router.post('/create-quiz');
router.get('/:id');
router.patch('/:id');
router.delete('/:id');

router.get('/');

export const QuizRoutes = router;
