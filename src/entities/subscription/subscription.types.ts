import { z } from 'zod';
import { SubscriptionPlanSchema } from './subscription.contracts';

export type SubscriptionPlan = z.infer<typeof SubscriptionPlanSchema>;
