import express from "express";
import userRouter from "./userRoutes";
import authRouter from "./authRoutes";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.use("/api/users", userRouter);

router.use("/api/sessions", authRouter);

export default router;
