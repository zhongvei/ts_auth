import { CreateSessionInput } from "@/schema/authSchema.ts";
import { signAcessToken, signRefreshToken } from "@/service/authService";
import { findUserByEmail } from "@/service/userService";
import { Request, Response } from "express";

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
        return res.send('User not found').status(404);
    }

    if (!user.verified) {
        return res.send('User not verified').status(409);
    }

    const passwordValid = await user.validatePassword(password);

    if (!passwordValid) {
        return res.send('Invalid password').status(400);
    }

    //sign a access token and refresh token
    const accessToken = signAcessToken(user);
    const refreshToken = await signRefreshToken({ userId: user._id });

    return res.send({ accessToken, refreshToken }).status(200);
};