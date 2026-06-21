import { GymSchema } from 'entities/gym/gym.contracts';
import {
  TenantFeatureFlagSchema,
  PlanLimitSchema,
  SubscriptionPlanSchema,
  SubscriptionSchema,
} from 'entities/subscription/subscription.contracts';
import { UserSchema } from 'entities/user/user.contracts';
import { z } from 'zod';

// Base response schema for all API calls
export const createApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    message: z.string(),
    data: dataSchema,
  });

export const ApiErrorDataDtoSchema = z.object({
  errors: z.record(z.string(), z.array(z.string())),
});

export const ApiErrorDataSchema = z.array(z.string());

export const LoginUserDtoSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const RegisterUserDtoSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
});

// Specific data schemas
export const LoginDataSchema = z.object({
  user: UserSchema,
  accessToken: z.string(),
});

export const ProfileDataSchema = z.object({
  user: UserSchema,
});

export const OnboardingDtoSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  city: z.string(),
  gym_url: z.string(),
});

export const CheckoutDtoSchema = z.object({
  plan_id: z.string(),
});

export const CheckoutCompleteDtoSchema = z.object({
  sessionId: z.string().uuid(),
});

export const createGymDtoSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  gym_url: z.string().min(3, 'Gym URL must be at least 3 characters'),
  city: z.string().min(3, 'City must be at least 3 characters'),
  address: z.string().min(3, 'Address must be at least 3 characters').optional(),
  email: z.email().optional(),
  state: z.string().optional(),
  logo_url: z.string().optional(),
});

export const UpdateUserDtoSchema = z.object({
  email: z.email('Invalid email address').optional(),
  name: z.string().optional(),
  password: z.string().optional(),
  currentPassword: z.string().optional(),
  id: z.string().nullable(),
});

export const GymDataSchema = z.object({
  gyms: z.array(GymSchema),
});

export const SubscriptionResponseSchema = createApiResponseSchema(
  z.object({
    tenant: z.any(),
    subscription: SubscriptionSchema,
    plan: SubscriptionPlanSchema,
    feature_flags: z.array(TenantFeatureFlagSchema),
    limits: z.array(PlanLimitSchema),
  })
);

export const StaffSearchDtoSchema = z.object({
  query: z.string().optional(),
});

// Full response schemas
export const LoginResponseSchema = createApiResponseSchema(LoginDataSchema);
export const ProfileResponseSchema = createApiResponseSchema(ProfileDataSchema);
export const RegisterResponseSchema = createApiResponseSchema(ProfileDataSchema);
export const OnboardingResponseSchema = createApiResponseSchema(OnboardingDtoSchema);
export const GymResponseSchema = createApiResponseSchema(GymDataSchema);
export const GymByIdResponseSchema = createApiResponseSchema(GymSchema);
export const SubscriptionPlansResponseSchema = createApiResponseSchema(
  z.array(SubscriptionPlanSchema)
);
export const CurrentSubscriptionResponseSchema = createApiResponseSchema(SubscriptionPlanSchema);
