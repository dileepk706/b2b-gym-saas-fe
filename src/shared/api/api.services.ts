import { AxiosRequestConfig } from 'axios';
import { api } from './api.instance';
import {
  LoginUserDtoSchema,
  RegisterUserDtoSchema,
  LoginResponseSchema,
  RegisterResponseSchema,
  ProfileResponseSchema,
  OnboardingDtoSchema,
  GymResponseSchema,
  GymByIdResponseSchema,
  SubscriptionPlansResponseSchema,
  SubscribeDtoSchema,
  SubscriptionResponseSchema,
} from './api.contracts';
import { LoginUserDto, OnboardingDto, RegisterUserDto, SubscribeDto } from './api.types';
import { responseContract } from './api.lib';

export function loginUser(loginUserDto: LoginUserDto, config?: AxiosRequestConfig<LoginUserDto>) {
  const data = LoginUserDtoSchema.parse(loginUserDto);
  return api.post('/user-auth/login', data, config).then(responseContract(LoginResponseSchema));
}

export function registerUser(
  registerUserDto: RegisterUserDto,
  config?: AxiosRequestConfig<RegisterUserDto>
) {
  const data = RegisterUserDtoSchema.parse(registerUserDto);
  return api
    .post('/user-auth/register', data, config)
    .then(responseContract(RegisterResponseSchema));
}

export function logoutUser(config?: AxiosRequestConfig) {
  return api.post('/user-auth/logout', config);
}

export function getUserProfile(config?: AxiosRequestConfig) {
  return api.get('/user/profile', config).then(responseContract(ProfileResponseSchema));
}

export function onboardingCreateWorkSpace(
  onboardingData: OnboardingDto,
  config?: AxiosRequestConfig<OnboardingDto>
) {
  const data = OnboardingDtoSchema.parse(onboardingData);
  return api.post('/onboarding/create-workspace', data, config);
}

export function getGymsGlobal(config?: AxiosRequestConfig) {
  return api.get('/gyms/global', config).then(responseContract(GymResponseSchema));
}

export function getGymByIdGlobal(gymId: string, config?: AxiosRequestConfig) {
  return api.get(`/gyms/global/${gymId}`, config).then(responseContract(GymByIdResponseSchema));
}

export function getSubscriptionPlans(config?: Parameters<typeof api.get>[1]) {
  return api
    .get('/subscription-plans', config)
    .then(responseContract(SubscriptionPlansResponseSchema));
}

export function getCurrentSubscription(config?: Parameters<typeof api.get>[1]) {
  return api
    .get('/subscriptions/current', config)
    .then(responseContract(SubscriptionResponseSchema));
}

export function subscribe(subscribeDto: SubscribeDto, config?: Parameters<typeof api.get>[1]) {
  const data = SubscribeDtoSchema.parse(subscribeDto);
  return api
    .post('/subscriptions', data, config)
    .then(responseContract(SubscriptionResponseSchema));
}
