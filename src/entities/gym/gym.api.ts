import { queryOptions } from '@tanstack/react-query';
import { getGymByIdGlobal, getGymsGlobal, getUserGyms } from 'shared/api/api.services';
import { queryClient } from 'shared/queryClient';
import { Gym } from './gym.type';

export const gymsGlobalQueryOptions = () =>
  queryOptions({
    queryKey: ['gyms'],

    queryFn: async ({ signal }) => {
      const { data } = await getGymsGlobal({ signal });
      return data.data.gyms;
    },

    initialData: () => queryClient.getQueryData<Gym[]>(['gyms']),
    initialDataUpdatedAt: () => queryClient.getQueryState(['gyms'])?.dataUpdatedAt,
  });

export const gymByIdQueryOptions = (gymId: string) =>
  queryOptions({
    queryKey: ['gym', gymId],

    queryFn: async ({ signal }) => {
      const { data } = await getGymByIdGlobal(gymId, { signal });
      return data.data;
    },

    initialData: () => queryClient.getQueryData<Gym>(['gym', gymId]),
    initialDataUpdatedAt: () => queryClient.getQueryState(['gym', gymId])?.dataUpdatedAt,
  });

export const userGymsQueryOptions = (tenantId: string, userId: string) =>
  queryOptions({
    queryKey: ['gyms', tenantId, userId],

    queryFn: async ({ signal }): Promise<Gym[]> => {
      const { data } = await getUserGyms(tenantId, userId, { signal });
      return data.data;
    },

    initialData: () => queryClient.getQueryData<Gym[]>(['gyms', tenantId, userId]),
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(['gyms', tenantId, userId])?.dataUpdatedAt,
  });
