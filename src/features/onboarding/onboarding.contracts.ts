import { z } from 'zod';

export const OnboardingSchema = z.object({
  name: z.string().min(1, {
    message: 'Gym name is required.',
  }),
  gym_url: z.string().min(1, {
    message: 'Gym url is required.',
  }),
  city: z.string().min(1, {
    message: 'Gym city is required.',
  }),
  address: z.string().optional(),
});

