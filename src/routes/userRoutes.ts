import requireUser from "../middleware/requireUser";
import { createUserHandler, forgotPasswordHandler, verifyUserHandler, resetPasswordHandler, getCurrentUserHandler } from "../controller/userController";
import validateResource from "../middleware/validateResource";
import { createUserSchema, verfiyUserSchema, forgotPasswordSchema, resetPasswordSchema } from "../schema/userSchema";
import express from "express";

const userRouter = express.Router();

userRouter.post('/', validateResource(createUserSchema), createUserHandler);

userRouter.post('/verify/:id/:verificationCode', validateResource(verfiyUserSchema), verifyUserHandler);

userRouter.post('/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);

userRouter.post('/resetpassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler);

userRouter.get('/me', requireUser, getCurrentUserHandler);

export default userRouter;