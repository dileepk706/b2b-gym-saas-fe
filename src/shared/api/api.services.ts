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
  CheckoutDtoSchema,
  SubscriptionResponseSchema,
  CheckoutCompleteDtoSchema,
  UpdateUserDtoSchema,
  StaffSearchDtoSchema,
  CreateStaffDtoSchema,
} from './api.contracts';
import {
  CheckoutSessionResponse,
  LoginUserDto,
  OnboardingDto,
  RegisterUserDto,
  CheckoutDto,
  SubscriptionPlansResponse,
  CheckoutCompleteDto,
  CheckoutCompleteResponse,
  CurrentSubscriptionResponseDto,
  CurentTenantResponseDto,
  UpdateUserResponseDto,
  UpdateUserDto,
  StaffSearchResponse,
  ApiResponse,
} from './api.types';
import { responseContract } from './api.lib';
import { Tenant } from 'entities/tenant/tenant.type';
import { Gym } from 'entities/gym/gym.type';
import { StaffSearchDto } from './api.dto';
import { Role } from 'entities/roles/roles.contract';

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

export function updateUserProfile(user: UpdateUserDto, config?: AxiosRequestConfig) {
  const data = UpdateUserDtoSchema.parse(user);
  return api.post<UpdateUserResponseDto>('/user/' + user.id, data, config);
}

export function updateSelfUserProfile(user: UpdateUserDto, config?: AxiosRequestConfig) {
  const data = UpdateUserDtoSchema.parse(user);
  return api.put<UpdateUserResponseDto>('/user/profile', data, config);
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
  return api.get<SubscriptionPlansResponse>('/subscription-plans', config);
}

export function getCurrentSubscription(config?: Parameters<typeof api.get>[1]) {
  return api.get<CurrentSubscriptionResponseDto>('/subscriptions/current', config);
}

export function checkout(subscribeDto: CheckoutDto, config?: Parameters<typeof api.get>[1]) {
  const data = CheckoutDtoSchema.parse(subscribeDto);
  return api.post<CheckoutSessionResponse>('/subscriptions/checkout', data, config);
}

export function checkoutComplete(
  sessionId: CheckoutCompleteDto,
  config?: Parameters<typeof api.get>[1]
) {
  const data = CheckoutCompleteDtoSchema.parse(sessionId);
  return api.post<CheckoutCompleteResponse>(
    `/subscriptions/checkout/${data.sessionId}/complete`,
    data,
    config
  );
}

export function getTenant(id: string, config?: AxiosRequestConfig) {
  return api.get<CurentTenantResponseDto>(`/tenant/${id}`, config);
}

export function getUserGyms(tenantId: string, userId: string, config?: AxiosRequestConfig) {
  return api.get(`/gyms/global/tenant/${tenantId}/user/${userId}`, config);
}

export function searchStaff(sp: StaffSearchDto, config?: AxiosRequestConfig) {
  const data = StaffSearchDtoSchema.parse(sp);
  return api.get<StaffSearchResponse>(
    `/staff?query=${encodeURIComponent(data.query || '')}`,
    config
  );
}

export function createStaff(dto: unknown, config?: AxiosRequestConfig) {
  const data = CreateStaffDtoSchema.parse(dto);
  return api.post('/staff', data, config);
}

export function getRoles(config?: AxiosRequestConfig) {
  return api.get<ApiResponse<Role[]>>('/roles', config);
}
