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

export const SubscriptionSchema = z.object({
  id: z.string(),
  tenant_id: z.string(),
  plan_id: z.string(),

  // Lifecycle state
  status: z.string(),

  // Billing period
  current_period_start: z.date().nullable(),
  current_period_end: z.date().nullable(),
  expires_at: z.date().nullable(),
  starts_at: z.date().nullable(),

  // Trial
  trial_ends_at: z.date().nullable(),

  // Cancellation
  cancelled_at: z.date().nullable(),
  cancel_at_period_end: z.boolean(),

  // Scheduled downgrade
  scheduled_plan_id: z.string().nullable(),

  // Renewal chain
  renewed_from_id: z.string().nullable(),

  // Metadata
  metadata: z.any().nullable(),
  created_at: z.date().nullable(),
});

export const TenantFeatureFlagSchema = z.object({
  tenant_id: z.string(),
  feature_id: z.string(),
  enabled: z.boolean(),
  source: z.string(),
  effective_from: z.date().nullable(),
  effective_until: z.date().nullable(),
});

export const TenantLimitSchema = z.object({
  tenant_id: z.string(),
  key: z.string(),
  value: z.number(),
  source: z.string(),
  effective_from: z.date().nullable(),
  effective_until: z.date().nullable(),
});

//
export const CheckoutSessionSchema = z.object({
  id: z.string(),
  tenant_id: z.string(),
  plan_id: z.string(),
  status: z.string(),
  expires_at: z.string(),
  completed_at: z.date(),
  created_at: z.date(),
});

export const SubscriptionPlanSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.string(),
  features: z.array(PlanFeatureSchema),
  limits: z.array(PlanLimitSchema),
  description: z.string(),
  currency: z.string(),
  billing_interval: z.string(),
  trial_days: z.number(),
  is_active: z.boolean(),
  sort_order: z.number(),
  expires_in: z.number().nullable(),
});

export const InvoiceSchema = z.object({
  id: z.string(),
  tenant_id: z.string(),
  subscription_id: z.string().nullable(),
  amount: z.number(),
  currency: z.string(),
  status: z.string(),
  due_date: z.date().nullable(),
  paid_at: z.date().nullable(),
  period_start: z.date().nullable(),
  period_end: z.date().nullable(),
  description: z.string().nullable,
  idempotency_key: z.string().nullable,
  created_at: z.date(),
  updated_at: z.date(),
});
