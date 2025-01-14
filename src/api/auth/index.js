import express from 'express';
import { signup, login } from './controllers.js';
import validateLoginUser from '../../middlewares/validateLoginUser.js';
import validateSignupUser from '../../middlewares/validateSignupUser.js';

const authRouter = express.Router();

authRouter.post('/signup', validateSignupUser, signup);
authRouter.post('/login', validateLoginUser, login);

export default authRouter;
