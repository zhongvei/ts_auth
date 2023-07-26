import { get } from "lodash";
import { CreateSessionInput } from "../schema/authSchema";
import { findSessionById, signAcessToken, signRefreshToken } from "../service/authService";
import { findUserByEmail, findUserById } from "../service/userService";
import { Request, Response } from "express";
import { verifyJwt } from "../utils/jwt";

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
    const refreshToken = await signRefreshToken({ userId: String(user._id) });

    return res.send({ accessToken, refreshToken }).status(200);
};

export async function refreshAccessTokenHandler(req: Request, res: Response) {
    const refreshToken = get(req, "headers.x-refresh");

    const decoded = verifyJwt<{session: string}>(String(refreshToken), "refreshTokenPublicKey");

    if(!decoded) {
        return res.send('Invalid token').status(401);
    };

    const session = await findSessionById(decoded.session);

    if(!session || !session?.valid) {
        return res.send('Invalid token').status(401);
    }

    const user = await findUserById(String(session.user));

    if (!user) {
        return res.send('User not found').status(404);
    }

    const accessToken = signAcessToken(user);

    return res.send({ accessToken }).status(200);

}