import { z } from 'zod';

export const LoginUserSchema = z.object({
  email: z.email({
    message: 'Oops! The email address you entered is invalid.',
  }),
  password: z.string().min(8, {
    message: 'Your password must be at least 8 characters long.',
  }),
});
