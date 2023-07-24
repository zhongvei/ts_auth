import express from 'express';
import validateResource from "../middleware/validateResource.ts";
import { createSessionSchema } from '../schema/authSchema.ts';
import { createSessionHandler } from '../controller/authContoller';

const authRouter = express.Router();

authRouter.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler);

export default authRouter;