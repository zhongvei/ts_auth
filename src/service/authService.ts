import AuthModel from "../model/authModel";
import { User, privateFields } from "../model/userModel";
import { signJwt } from "../utils/jwt";
import { DocumentType } from "@typegoose/typegoose";
import { omit } from "lodash";

export function signAcessToken(user: DocumentType<User>) {
    const payload = omit(user.toJSON(), privateFields);

    const accessToken = signJwt(payload, "accessTokenPrivateKey", { expiresIn: "15m" });

    return accessToken;
}

export async function createSession({ userId }: { userId: string }) {
    return await AuthModel.create({ user: userId });
}

export async function findSessionById(userId: string) {
    return AuthModel.findById(userId);
}

export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({ userId });

    const refreshToken = signJwt(
        {
            session: session._id,
        },
        "refreshTokenPrivateKey",
        {
            expiresIn: "1y",
        }
    );

    return refreshToken;
}
