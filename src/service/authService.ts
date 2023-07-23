import AuthModel from "@/model/authModel";
import { User } from "@/model/userModel";
import { signJwt } from "@/utils/jwt";
import { DocumentType } from "@typegoose/typegoose";

export function signAcessToken(user: DocumentType<User>) {
    const payload = user.toJSON();

    const accessToken = signJwt(payload, "accessTokenPrivateKey")

    return accessToken;
}

export async function createSession({ userId }: { userId: string }) {
    return await AuthModel.create({ user: userId });
}

export async function signRefreshToken({ userId }: { userId: string }) {
    const session = await createSession({ userId });

    const refreshToken = signJwt({
        session: session._id,
    }, 'refreshTokenPrivateKey')

    return refreshToken;
}