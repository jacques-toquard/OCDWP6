import express from 'express';
import { signup, login } from './controller.js';
import validateLoginUser from '../../middlewares/validateLoginUser.js';
import validateSignupUser from '../../middlewares/validateSignupUser.js';

const authRouter = express.Router();

authRouter.post('/signup', validateSignupUser, signup); // todo
authRouter.post('/login', validateLoginUser, login); // todo

export default authRouter;
