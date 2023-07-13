import { CreateUserInput } from "@/schema/userSchema.js";
import { createUser } from "@/service/userService.js";
import log from "@/utils/logger.js";
import { Request, Response } from "express";

export async function createUserHandler(req: Request<{}, {}, CreateUserInput>, res: Response) {
    const body = req.body;

    try {
        const user = await createUser(body);
        log.info(`User created: ${user}`);
        return res.send("User created successfully");
    } catch(e: any) {
        log.error(e);
        return res.status(409).send(e.message);
    }
};