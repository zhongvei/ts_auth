import UserModel, { User } from "@/model/userModel.js";

export async function createUser(body: Partial<User>) {
    return UserModel.create(body);
}