import { z } from 'zod';
import { RegisterUserSchema } from './register.contracts';

export type TRegisterUser = z.infer<typeof RegisterUserSchema>;
