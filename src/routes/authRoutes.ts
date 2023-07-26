import express from 'express';
import validateResource from "../middleware/validateResource";
import { createSessionSchema } from '../schema/authSchema';
import { createSessionHandler, refreshAccessTokenHandler } from '../controller/authContoller';

const authRouter = express.Router();

authRouter.post('/', validateResource(createSessionSchema), createSessionHandler);

authRouter.post('/refresh', refreshAccessTokenHandler);

export default authRouter;