import express from 'express';

import authController from '../../controllers/auth-controller.js';

import * as userSchemas from '../../models/User.js';

import { validateBody } from '../../helpers/index.js';

import { authenticate } from '../../middlewares/index.js';

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);

authRouter.post('/signup', userSignupValidate, authController.signup);

authRouter.post('/signin', userSigninValidate, authController.signin);

authRouter.get('/current', authenticate, authController.getCurent);

export default authRouter;
