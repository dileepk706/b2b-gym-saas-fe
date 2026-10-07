import { queryOptions } from '@tanstack/react-query';
import { getRoles, getRoleById } from 'shared/api/api.services';
import { queryClient } from 'shared/queryClient';
import { Role } from './roles.contract';

export const getRolesQueryOptions = () =>
  queryOptions({
    queryKey: ['roles'],

    queryFn: async ({ signal }): Promise<Role[]> => {
      const { data } = await getRoles({ signal });
      return data.data;
    },

    initialData: () => queryClient.getQueryData(['roles']),
    initialDataUpdatedAt: () => queryClient.getQueryState(['roles'])?.dataUpdatedAt,
  });

export const getRoleByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['role', id],

    queryFn: async ({ signal }): Promise<Role> => {
      const { data } = await getRoleById(id, { signal });
      return data.data;
    },

    initialData: () => queryClient.getQueryData<Role>(['role', id]),
    initialDataUpdatedAt: () => queryClient.getQueryState(['role', id])?.dataUpdatedAt,
  });
