import express from 'express';
import userRouter from './userRoutes.ts';
import authRouter from './authRoutes.ts';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use('/api/users', userRouter);

router.use('/api/sessions',authRouter);

export default router;