import { DefaultError, useMutation, UseMutationOptions } from '@tanstack/react-query';
import { subscribe } from 'shared/api/api.services';
import { TSubscription } from 'features/subscription/upgrade-plan/subscription.contracts';

export function useSubscriptionMutation(
  options: Partial<UseMutationOptions<any, DefaultError, TSubscription, unknown>> = {}
) {
  const { mutationKey = [], onMutate, onError, onSettled, onSuccess } = options;

  return useMutation({
    mutationKey: ['create-subscription', ...mutationKey],
    mutationFn: async (onboardingData: TSubscription) => {
      const data = await subscribe(onboardingData);
      return data;
    },
    onMutate,
    onSuccess: async (data, variables, context) => {
      await onSuccess?.(data, variables, context);
    },
    onError,
    onSettled,
  });
}
