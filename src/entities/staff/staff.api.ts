import { queryOptions } from '@tanstack/react-query';
import { queryClient } from 'shared/queryClient';
import { getStaffById, searchStaff } from 'shared/api/api.services';
import { StaffSearchDto } from 'shared/api/api.dto';
import { StaffSearchResponse } from 'shared/api/api.types';
import { Staffs } from './staff.contracts';

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

export const getStaffByIdQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['staff', id],

    queryFn: async ({ signal }): Promise<Staffs> => {
      const { data } = await getStaffById(id, { signal });
      return data.data;
    },

    initialData: () => queryClient.getQueryData<Staffs>(['staff', id]),
    initialDataUpdatedAt: () => queryClient.getQueryState(['staff', id])?.dataUpdatedAt,
  });
