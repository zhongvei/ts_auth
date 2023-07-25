import mongoose from "mongoose";
import { CreateUserInput, VerifyUserInput, ForgotPasswordInput, ResetPasswordInput } from "../schema/userSchema.ts";
import { createUser, findUserById, findUserByEmail } from "../service/userService.ts";
import log from "../utils/logger.ts";
import sendEmail from "../utils/mailer.ts";
import { Request, Response } from "express";
import { nanoid } from "nanoid";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;

    try {
        const user = await createUser(body);
        log.info(`User created: ${user}`);
        await sendEmail({
            from: 'test@gmail.com',
            to: user.email,
            subject: 'Please verify your account',
            text: `Verify your account by using this verification code ${user.verificationCode} for the user id ${user._id}`,
        })
        return res.send("User created successfully");
    } catch (e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
};

export async function verifyUserHandler(req: Request<VerifyUserInput>, res: Response) {
    const { id, verificationCode } = req.params;
    // find user by id and check if verification code matches

    //check if valid id from mongoose
    if (!mongoose.isValidObjectId(id)) {
        return res.send('Invalid mongodb user id').status(400);
    }

    const user = await findUserById(id);

    if (!user) {
        return res.send('User not found').status(404);
    }

    if (user.verified) {
        return res.send('User already verified').status(409);
    }

    if (user.verificationCode !== verificationCode) {
        return res.send('Invalid verification code').status(400);
    }

    if (user.verificationCode === verificationCode) {
        user.verified = true;
        await user.save();
        return res.send('User verified successfully').status(200);
    }
};

export async function forgotPasswordHandler(req: Request<{}, {}, ForgotPasswordInput>, res: Response) {
    const { email } = req.body;
    const user = await findUserByEmail(email);

    if (!user) {
        log.debug(`User not found with email ${email}`);
        return res.send('User not found').status(404);
    }

    if (!user.verified) {
        log.debug(`User not verified with email ${email}`);
        return res.send('User not verified').status(409);
    }

    const passwordResetCode = nanoid();

    user.passwordResetCode = passwordResetCode;
    await user.save();

    await sendEmail({
        from: 'test@gmail.com',
        to: user.email,
        subject: 'Reset Your Password',
        text: `Password reset code ${passwordResetCode} for the user id ${user._id}`,
    })

    log.debug(`Password reset code sent to ${email}`);

    return res.send('Password reset code sent successfully').status(200);
}

export async function resetPasswordHandler(req: Request<ResetPasswordInput['params'], {}, ResetPasswordInput['body']>, res: Response) {
    const { id, passwordResetCode } = req.params;

    const { password } = req.body;

    const user = await findUserById(id);

    if (!user || !user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
        return res.send('Invalid password reset code').status(400);
    }

    user.passwordResetCode = null;
    user.password = password;
    await user.save();

    log.debug(`Password reset successfully for user ${user._id}`);
    return res.send('Password reset successfully').status(200);

}

export async function getCurrentUserHandler(
    req: Request,
    res: Response
)  {
    return res.send(res.locals.user).status(200);
}