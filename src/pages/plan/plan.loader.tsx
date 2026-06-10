import {
  currentSubscriptionQueryOptions,
  subscriptionPlansQueryOptions,
} from 'entities/subscription';
import { LoaderFunctionArgs } from 'react-router';
import { queryClient } from 'shared/queryClient';

export async function PlanLoader({ request, params, context }: LoaderFunctionArgs) {
  const subscriptionPlansPromise = queryClient
    .fetchQuery(subscriptionPlansQueryOptions())
    .then((response) => response);

  const currentSubscription = await queryClient.ensureQueryData(currentSubscriptionQueryOptions());

  return {
    subscriptionPlansPromise,
    currentSubscription,
  };
}

export type PlanPageLoaderData = Awaited<ReturnType<typeof PlanLoader>>;
