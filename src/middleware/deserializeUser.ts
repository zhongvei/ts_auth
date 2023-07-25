import { verifyJwt } from "../utils/jwt";
import { NextFunction, Request, Response } from "express";

export const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = (req.headers.authorization || "").replace(/^Bearer\s/, "");

    if (!accessToken) return next();

    const decoded = verifyJwt<{ id: string }>(accessToken, "accessTokenPublicKey");

    if (decoded) {
        res.locals.user = decoded;
    }
    return next();
};