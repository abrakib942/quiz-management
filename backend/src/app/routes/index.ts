import express from 'express';
import { AuthRoute } from '../modules/auth/auth.routes';
import { UserRoutes } from '../modules/user/user.routes';
import { CategoryRoutes } from '../modules/category/category.routes';
import { QuizRoutes } from '../modules/quiz/quiz.routes';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    routes: AuthRoute,
  },
  {
    path: '/user',
    routes: UserRoutes,
  },
  {
    path: '/category',
    routes: CategoryRoutes,
  },
  {
    path: '/quiz',
    routes: QuizRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.routes));
export default router;
