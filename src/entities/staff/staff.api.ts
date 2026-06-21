import { queryOptions } from '@tanstack/react-query';
import { queryClient } from 'shared/queryClient';
import { Staffs } from './staff.contracts';
import { searchStaff } from 'shared/api/api.services';
import { StaffSearchDto } from 'shared/api/api.dto';

export const searchStaffQueryOptions = (sp: StaffSearchDto) =>
  queryOptions({
    queryKey: ['staffs', sp.query],

    queryFn: async ({ signal }) => {
      const { data } = await searchStaff(sp, { signal });
      return data.data;
    },

    initialData: () => queryClient.getQueryData<Staffs[]>(['staffs', sp.query]),
    initialDataUpdatedAt: () => queryClient.getQueryState(['staffs', sp.query])?.dataUpdatedAt,
  });
