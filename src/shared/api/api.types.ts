import { z } from 'zod';
import {
  ApiErrorDataDtoSchema,
  ApiErrorDataSchema,
  LoginUserDtoSchema,
  OnboardingDtoSchema,
  RegisterUserDtoSchema,
  CheckoutDtoSchema,
  CheckoutCompleteDtoSchema,
  UpdateUserDtoSchema,
} from './api.contracts';
import {
  CheckoutSession,
  Invoice,
  Subscription,
  SubscriptionPlan,
  TenantFeatureFlag,
  TenantLimit,
} from 'entities/subscription';
import { Tenant } from 'entities/tenant/tenant.type';
import { User } from 'entities/session';

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>;
export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;
export type OnboardingDto = z.infer<typeof OnboardingDtoSchema>;
export type CheckoutDto = z.infer<typeof CheckoutDtoSchema>;
export type CheckoutCompleteDto = z.infer<typeof CheckoutCompleteDtoSchema>;

export type CurrentSubscriptionResponseDto = ApiResponse<{
  subscription: Subscription;
  plan: SubscriptionPlan;
  scheduled_plan: SubscriptionPlan | null;
  feature_flags: TenantFeatureFlag[];
  limits: TenantLimit[];
  invoice: Invoice;
}>;

export type OnboardingResponse = ApiResponse<{
  accessToken: string;
  refreshToken: string;
  tenant: string;
  gym: string;
  staff: string;
  user: string;
}>;

export type CheckoutSessionResponse = ApiResponse<{
  session: CheckoutSession;
  plan: SubscriptionPlan;
}>;

export type CheckoutCompleteResponse = ApiResponse<{
  subscription: Subscription;
  plan: SubscriptionPlan;
  feature_flags: TenantFeatureFlag[];
  limits: TenantLimit[];
  invoice: any;
}>;

export type SubscriptionPlansResponse = ApiResponse<SubscriptionPlan[]>;

export type CurentTenantResponseDto = ApiResponse<Tenant>;

export type UpdateUserResponseDto = ApiResponse<User>;

export type UpdateUserDto = z.infer<typeof UpdateUserDtoSchema>;
