import * as z from 'zod';

export const FormSchema =  z.object({
    username: z.string().min(1, "Username is required").max(255),
    email: z.string().min(1, "Email is required").email("Invalid email").max(255),
    password: z.string().min(1, "Password is required").max(255),
});