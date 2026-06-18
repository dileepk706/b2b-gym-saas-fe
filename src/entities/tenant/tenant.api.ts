import { queryOptions } from '@tanstack/react-query';
import { queryClient } from 'shared/queryClient';
import { CurentTenantResponseDto } from 'shared/api/api.types';
import { getTenant } from 'shared/api/api.services';

export const currentTenantQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['current-tenant', id],

    queryFn: async ({ signal }): Promise<CurentTenantResponseDto['data']> => {
      const { data } = await getTenant(id, { signal });
      return data.data;
    },

    initialData: () =>
      queryClient.getQueryData<CurentTenantResponseDto['data']>(['current-tenant', id]),
    initialDataUpdatedAt: () => queryClient.getQueryState(['current-tenant', id])?.dataUpdatedAt,
  });
