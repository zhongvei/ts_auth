import UserModel, { User } from "../model/userModel";

export async function createUser(body: Partial<User>) {
    return UserModel.create(body);
}

export async function findUserById(id: string) {
    return UserModel.findById(id);
}

export async function findUserByEmail(email: string) {
    return UserModel.findOne({ email });
}
