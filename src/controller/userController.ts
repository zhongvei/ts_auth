import { CreateUserInput } from "../schema/userSchema.ts";
import { createUser } from "../service/userService.ts";
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