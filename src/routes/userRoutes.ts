import { createUserHandler } from "@/controller/userController.js";
import validateResource from "@/middleware/validateResource.js";
import { createUserSchema } from "@/schema/userSchema.js";
import express from "express";

const router = express.Router();

router.post('/api/users', validateResource(createUserSchema), createUserHandler);

export default router;