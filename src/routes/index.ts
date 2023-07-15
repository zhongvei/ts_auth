import express from 'express';
import userRouter from './userRoutes.ts';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.use(userRouter);

export default router;