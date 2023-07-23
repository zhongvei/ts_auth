import { CreateSessionInput } from "@/schema/authSchema";
import { Request, Response } from "express";

export async function createSessionHandler(req: Request<{}, {}, CreateSessionInput>, res: Response) {
    const { email, password } = req.body;
    
};