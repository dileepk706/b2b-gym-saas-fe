import { currentSubscriptionQueryOptions } from 'entities/subscription';
import { LoaderFunctionArgs } from 'react-router';
import { queryClient } from 'shared/queryClient';

export async function PlanLoader({ request, params, context }: LoaderFunctionArgs) {
  const currentSubscription = await queryClient.ensureQueryData(currentSubscriptionQueryOptions());
  return {
    currentSubscription,
  };
}

export type PlanPageLoaderData = Awaited<ReturnType<typeof PlanLoader>>;
