import express from 'express';
import authcontroller from './auth.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from '../user/user.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidation.signUpUserZodSchema),
  authcontroller.createauthUser
);
router.post(
  '/signin',
  validateRequest(UserValidation.loginUserZodSchema),
  authcontroller.loginUser
);
router.post('/refresh-token', authcontroller.refreshToken);
export const AuthRoute = router;
