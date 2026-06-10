import z from 'zod';

export const TenantSchema = z.object({
  id: z.string(),
  subscription_plan: z.string(),
  name: z.string(),
  primary_gym_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
