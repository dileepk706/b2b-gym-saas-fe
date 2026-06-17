import { z } from 'zod';
import {
  CheckoutSessionSchema,
  InvoiceSchema,
  SubscriptionPlanSchema,
  SubscriptionSchema,
  TenantFeatureFlagSchema,
  TenantLimitSchema,
} from './subscription.contracts';

export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
export type CheckoutSessionStatus = 'pending' | 'completed' | 'expired';
export type CheckoutSession = z.infer<typeof CheckoutSessionSchema>;
export type SubscriptionStatus =
  | 'trialing'
  | 'active'
  | 'past_due'
  | 'cancelled'
  | 'expired'
  | 'suspended';
export type Subscription = z.infer<typeof SubscriptionSchema>;
export type TenantFeatureFlag = z.infer<typeof TenantFeatureFlagSchema>;
export type TenantLimit = z.infer<typeof TenantLimitSchema>;
export type InvoiceStatus = 'draft' | 'open' | 'paid' | 'void' | 'uncollectible';
export type Invoice = z.infer<typeof InvoiceSchema>;
