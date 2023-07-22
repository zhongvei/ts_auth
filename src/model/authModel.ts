import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import { User } from './userModel';

export class Auth {
    @prop({ ref: () => User })
    user?: Ref<User>;

    @prop({ default: true })
    valid: boolean;
}

const AuthModel = getModelForClass(Auth, {
    schemaOptions: { timestamps: true },
});

export default AuthModel;