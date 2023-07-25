import express from 'express';
import validateResource from "../middleware/validateResource.ts";
import { createSessionSchema } from '../schema/authSchema.ts';
import { createSessionHandler, refreshAccessTokenHandler } from '../controller/authContoller';

const authRouter = express.Router();

authRouter.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler);

authRouter.post('/api/sessions/refresh', refreshAccessTokenHandler);

export default authRouter;