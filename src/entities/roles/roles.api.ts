import { queryOptions } from '@tanstack/react-query';
import { getRoles } from 'shared/api/api.services';
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
