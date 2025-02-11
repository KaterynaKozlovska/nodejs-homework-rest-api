import express from 'express';

import authController from '../../controllers/auth-controller.js';

import * as userSchemas from '../../models/User.js';

import { validateBody } from '../../helpers/index.js';

import { authenticate, upload } from '../../middlewares/index.js';

const authRouter = express.Router();

const userSignupValidate = validateBody(userSchemas.userSignupSchema);
const userSigninValidate = validateBody(userSchemas.userSigninSchema);
const userEmailValidate = validateBody(userSchemas.userEmailSchema);

authRouter.post('/register', userSignupValidate, authController.signup);

authRouter.get('/verify/:verificationToken', authController.verify);

authRouter.post('/verify', userEmailValidate, authController.resendVerifyEmail);

authRouter.post('/login', userSigninValidate, authController.signin);

authRouter.get('/current', authenticate, authController.getCurrent);

authRouter.post('/logout', authenticate, authController.signout);

authRouter.patch('/', authenticate, authController.updateSubscription);

authRouter.patch('/avatars', authenticate, upload.single('avatar'), authController.updateAvatar);

export default authRouter;
