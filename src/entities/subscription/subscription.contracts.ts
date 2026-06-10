import { z } from 'zod';

export const PlanFeatureSchema = z.object({
  id: z.string(),
  key: z.string(),
  name: z.string(),
});

export const PlanLimitSchema = z.object({
  key: z.string(),
  value: z.number().nullable(),
});

export const SubscriptionPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  features: z.array(PlanFeatureSchema),
  limits: z.array(PlanLimitSchema),
});

export const SubscriptionSchema = z.object({
  id: z.string(),
  tenant_id: z.string(),
  plan_id: z.string(),
  status: z.string(),
  starts_at: z.string().nullable(),
  expires_at: z.string().nullable(),
  cancelled_at: z.string().nullable(),
  created_at: z.string(),
});

export const FeatureFlagSchema = z.object({
  tenant_id: z.string(),
  feature_id: z.string(),
  enabled: z.boolean(),
});

export const TenantLimitSchema = z.object({
  tenant_id: z.string(),
  key: z.string(),
  value: z.number(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});
