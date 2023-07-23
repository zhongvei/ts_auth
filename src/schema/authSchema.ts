import { object, string, TypeOf } from 'zod';

export const createSessionSchema = object({
    body: object({
        email: string({
            required_error: 'Email is required',
        }).email(),
        password: string(({
            required_error: 'Password is required',
        })).min(6, 'Password must be at least 8 characters'),
    }),
});

export type CreateSessionInput = TypeOf<typeof createSessionSchema>;