import UserModel, { User } from "../model/userModel.ts";

export async function createUser(body: Partial<User>) {
    return UserModel.create(body);
}