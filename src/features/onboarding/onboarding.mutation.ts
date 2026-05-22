import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { onboardingCreateWorkSpace } from 'shared/api/api.services';
import { TOnboarding } from './onboarding.types';

export function useOnboardingMutation(
  options: Partial<UseMutationOptions<any, DefaultError, TOnboarding, unknown>> = {}
) {
  const { mutationKey = [], onMutate, onError, onSettled, onSuccess } = options;

  return useMutation({
    mutationKey: ['session', 'onboarding-user', ...mutationKey],
    mutationFn: async (onboardingData: TOnboarding) => {
      const data = await onboardingCreateWorkSpace(onboardingData);
      return data;
    },
    onMutate,
    onSuccess: async (data, variables, context) => {
      onSuccess?.(data, variables, context);
    },
    onError,
    onSettled,
  });
}
