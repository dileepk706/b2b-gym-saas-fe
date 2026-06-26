import { getRolesQueryOptions } from 'entities/roles/roles.api';
import { LoaderFunctionArgs } from 'react-router';
import { queryClient } from 'shared/queryClient';

export async function StaffCreateLoader({ request, params, context }: LoaderFunctionArgs) {
  const staffRoles = await queryClient.ensureQueryData(getRolesQueryOptions());
  return {
    staffRoles,
  };
}

export type PlanPageLoaderData = Awaited<ReturnType<typeof StaffCreateLoader>>;
