const { z } = require('zod');

const AccountFormDataSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    birthday: z.string().min(1),
    email: z.string().min(1).email(),
    password: z.string().min(1),
});

const AccountCredentialSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(8),
});

module.exports = { AccountFormDataSchema, AccountCredentialSchema };