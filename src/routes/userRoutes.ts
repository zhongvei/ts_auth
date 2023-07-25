import requireUser from "../middleware/requireUser.ts";
import { createUserHandler, forgotPasswordHandler, verifyUserHandler, resetPasswordHandler, getCurrentUserHandler } from "../controller/userController.ts";
import validateResource from "../middleware/validateResource.ts";
import { createUserSchema, verfiyUserSchema, forgotPasswordSchema, resetPasswordSchema } from "../schema/userSchema.ts";
import express from "express";

const userRouter = express.Router();

userRouter.post('/api/users', validateResource(createUserSchema), createUserHandler);

userRouter.post('/api/users/verify/:id/:verificationCode', validateResource(verfiyUserSchema), verifyUserHandler);

userRouter.post('/api/users/forgotpassword', validateResource(forgotPasswordSchema), forgotPasswordHandler);

userRouter.post('/api/users/resetpassword/:id/:passwordResetCode', validateResource(resetPasswordSchema), resetPasswordHandler);

userRouter.get('/api/users/me', requireUser, getCurrentUserHandler);

export default userRouter;