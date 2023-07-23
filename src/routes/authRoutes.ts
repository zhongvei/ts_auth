import express from 'express';
import validateResource from '@/middleware/validateResource';
import { createSessionSchema } from '@/schema/authSchema';
import { createSessionHandler } from '@/controller/authContoller';

const router = express.Router();

router.post('/api/session',validateResource(createSessionSchema),createSessionHandler);

export default router;