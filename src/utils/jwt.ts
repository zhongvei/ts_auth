import jwt from 'jsonwebtoken';
import config from 'config';

export function signJwt(
    object: Object,
    keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey',
    options?: jwt.SignOptions | undefined
) {
    const signingKey = Buffer.from(config.get<string>(keyName), "base64").toString("ascii");
    return jwt.sign(object, signingKey, {
        ...(options && options),
        algorithm: "RS256",
    });

}

export function verifyJwt(token: string) {
    return jwt.verify(token, config.get('jwtSecret'));
}