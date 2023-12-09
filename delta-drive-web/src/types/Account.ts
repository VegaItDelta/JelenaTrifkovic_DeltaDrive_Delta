import { z } from 'zod';

export const AccountFormDataSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    birthday: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(1),
});

export interface AccountFormData {
    firstName: string;
    lastName: string;
    birthday: string;
    email: string;
    password: string;
}

export interface AccountCredential {
    email: string;
    password: string;
}

export const AccountCredentialSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(8),
});

export const AccountSignedInSchema = z.object({
    user: z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        birthday: z.string().min(1),
        email: z.string().min(1).email(),
    }),
    accessToken: z.string().min(1),
    refreshToken: z.string().min(1),
});

export interface AccountSignedIn {
    user: {
        firstName: string;
        lastName: string;
        birthday: string;
        email: string;
    };
    accessToken: string;
    refreshToken: string;
}