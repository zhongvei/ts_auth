import mongoose from "mongoose";
import { CreateUserInput, VerifyUserInput } from "../schema/userSchema.ts";
import { createUser, findUserById } from "../service/userService.ts";
import log from "../utils/logger.ts";
import sendEmail from "../utils/mailer";
import { Request, Response } from "express";

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
    } catch(e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
};

export async function verifyUserHandler (req: Request<VerifyUserInput>, res: Response) {
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