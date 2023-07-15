import { createUserHandler } from "../controller/userController.ts";
import validateResource from "../middleware/validateResource.ts";
import { createUserSchema } from "../schema/userSchema.ts";
import express from "express";

const userRouter = express.Router();

userRouter.post('/api/users', validateResource(createUserSchema), createUserHandler);

export default userRouter;