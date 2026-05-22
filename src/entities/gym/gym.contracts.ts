import { z } from 'zod';

export const GymSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  gym_url: z.string().min(3, 'Gym URL must be at least 3 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  address: z.string().min(3, 'Address must be at least 3 characters').nullable(),
  email: z.email().nullable(),
  state: z.string().nullable(),
  logo_url: z.string().nullable(),
  id: z.string(),
  tenant_id: z.string(),
  phone: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
  deleted: z.boolean(),
});
