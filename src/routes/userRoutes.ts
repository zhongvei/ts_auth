import { createUserHandler, verifyUserHandler } from "../controller/userController.ts";
import validateResource from "../middleware/validateResource.ts";
import { createUserSchema, verfiyUserSchema } from "../schema/userSchema.ts";
import express from "express";

const userRouter = express.Router();

userRouter.post('/api/users', validateResource(createUserSchema), createUserHandler);

userRouter.post('/api/users/verify/:id/:verificationCode', validateResource(verfiyUserSchema), verifyUserHandler);

export default userRouter;