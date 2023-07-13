import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }).email('Not a valid email address'),
        firstName: string({
            required_error: 'First name is required',
        }),
        lastName: string({
            required_error: 'Last name is required',
        }),
        password: string({
            required_error: 'Password is required',
        }).min(8, 'Password must be at least 8 characters'),
        passwordConfirmation: string({
            required_error: 'Password confirmation is required',
        }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match',
        path: ['passwordConfirmation'],
    }),
});

export type CreateUserInput = Omit<TypeOf<typeof createUserSchema>['body'], 'body.passwordConfirmation'>;