import { z } from 'zod';
import { GymSchema } from './gym.contracts';

export type Gym = z.infer<typeof GymSchema>;
