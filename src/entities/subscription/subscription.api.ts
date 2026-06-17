import { queryOptions } from '@tanstack/react-query';
import axios from 'axios';
import { queryClient } from 'shared/queryClient';
import { getCurrentSubscription, getSubscriptionPlans } from 'shared/api/api.services';
import { CurrentSubscriptionResponseDto } from 'shared/api/api.types';
import { SubscriptionPlan } from './subscription.types';

export const subscriptionPlansQueryOptions = () =>
  queryOptions({
    queryKey: ['subscription-plans'],

    queryFn: async ({ signal }) => {
      const { data } = await getSubscriptionPlans({ signal });
      return data.data;
    },

    initialData: () => queryClient.getQueryData<SubscriptionPlan[]>(['subscription-plans']),
    initialDataUpdatedAt: () => queryClient.getQueryState(['subscription-plans'])?.dataUpdatedAt,
  });

export const currentSubscriptionQueryOptions = () =>
  queryOptions({
    queryKey: ['current-subscription'],

    queryFn: async ({ signal }): Promise<CurrentSubscriptionResponseDto> => {
      try {
        const { data } = await getCurrentSubscription({ signal });
        return data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const responseData = error.response?.data;
          const status = error.response?.status;

          if (
            status === 404 ||
            (responseData &&
              typeof responseData === 'object' &&
              'message' in responseData &&
              responseData.message === 'Current subscription not found')
          ) {
            return null as any;
          }
        }
        throw error;
      }
    },

    initialData: () =>
      queryClient.getQueryData<CurrentSubscriptionResponseDto | null>(['current-subscription']),
    initialDataUpdatedAt: () => queryClient.getQueryState(['current-subscription'])?.dataUpdatedAt,
  });
