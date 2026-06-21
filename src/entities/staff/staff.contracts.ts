import { z } from 'zod';

export const staffSchema = z.object({
  id: z.string(),
  tenant_id: z.string(),
  gym_id: z.string(),
  user_id: z.string(),
  role_id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  check_in_code: z.number().int(),
  created_at: z.date(),
  updated_at: z.date(),
});

export type Staffs = z.infer<typeof staffSchema>;
