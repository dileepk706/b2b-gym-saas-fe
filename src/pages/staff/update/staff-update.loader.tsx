import { LoaderFunctionArgs } from 'react-router-dom';
import { queryClient } from 'shared/queryClient';
import { getStaffByIdQueryOptions } from 'entities/staff/staff.api';
import { getRolesQueryOptions } from 'entities/roles/roles.api';

export async function StaffUpdateLoader({ params }: LoaderFunctionArgs) {
  const staffId = params.id as string;
  const staff = await queryClient.fetchQuery(getStaffByIdQueryOptions(staffId));
  const staffRoles = await queryClient.ensureQueryData(getRolesQueryOptions());
  
  return {
    staff,
    staffRoles,
  };
}
