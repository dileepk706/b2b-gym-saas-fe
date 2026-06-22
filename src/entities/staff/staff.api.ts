import { queryOptions } from '@tanstack/react-query';
import { queryClient } from 'shared/queryClient';
import { searchStaff } from 'shared/api/api.services';
import { StaffSearchDto } from 'shared/api/api.dto';
import { StaffSearchResponse } from 'shared/api/api.types';

export const searchStaffQueryOptions = (sp: StaffSearchDto) =>
  queryOptions({
    queryKey: ['staffs', sp.query],

    queryFn: async ({ signal }): Promise<StaffSearchResponse> => {
      const { data } = await searchStaff(sp, { signal });
      return data;
    },

    initialData: () => queryClient.getQueryData<StaffSearchResponse>(['staffs', sp.query]),
    initialDataUpdatedAt: () => queryClient.getQueryState(['staffs', sp.query])?.dataUpdatedAt,
  });
