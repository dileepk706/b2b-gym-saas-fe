import { queryOptions } from '@tanstack/react-query';
import { getGymByIdGlobal, getGymsGlobal } from 'shared/api/api.services';
import { queryClient } from 'shared/queryClient';
import { Gym } from './gym.type';

export const gymsQueryOptions = () =>
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
