import { prop, getModelForClass, modelOptions, Severity, pre, DocumentType, index } from '@typegoose/typegoose';
import { nanoid } from 'nanoid';
import argon2 from 'argon2';
import log from '../utils/logger.ts';

@pre<User>('save', async function () {
    if (!this.isModified('password')) return;

    const hash = await argon2.hash(this.password);
    this.password = hash;
    return;
})
@index({ email: 1 })
@modelOptions({
    schemaOptions: {
        timestamps: true,
    },
    options: {
        allowMixed: Severity.ALLOW,
    }
})
export class User {
    @prop({ required: true, unique: true, })
    email: string;

    @prop({ required: true, })
    firstName: string;

    @prop({ required: true, })
    lastName: string;

    @prop({ required: true, })
    password: string;

    @prop({ required: true, default: () => nanoid() })
    verificationCode: string;

    @prop({ default: null })
    passwordResetCode: string | null;

    @prop({ default: false })
    verified: boolean;

    async validatePassword(this: DocumentType<User>, password: string) {
        try {
            const valid = await argon2.verify(this.password, password);
            return valid;
        } catch (e) {
            log.error(e);
            return false;
        }
    }
}

const UserModel = getModelForClass(User);

export default UserModel;