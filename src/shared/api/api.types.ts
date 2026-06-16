import { z } from 'zod';
import {
  ApiErrorDataDtoSchema,
  ApiErrorDataSchema,
  LoginUserDtoSchema,
  OnboardingDtoSchema,
  RegisterUserDtoSchema,
  SubscribeDtoSchema,
  SubscriptionResponseSchema,
} from './api.contracts';

export type LoginUserDto = z.infer<typeof LoginUserDtoSchema>;
export type ApiErrorData = z.infer<typeof ApiErrorDataSchema>;
export type ApiErrorDataDto = z.infer<typeof ApiErrorDataDtoSchema>;
export type RegisterUserDto = z.infer<typeof RegisterUserDtoSchema>;
export type OnboardingDto = z.infer<typeof OnboardingDtoSchema>;
export type SubscribeDto = z.infer<typeof SubscribeDtoSchema>;
export type SubscriptionResponseDto = z.infer<typeof SubscriptionResponseSchema>;

export interface OnboardingResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    tenant: string;
    gym: string;
    staff: string;
    user: string;
  };
}

