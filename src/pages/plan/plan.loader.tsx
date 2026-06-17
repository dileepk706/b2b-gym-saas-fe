import {
  currentSubscriptionQueryOptions,
  subscriptionPlansQueryOptions,
} from 'entities/subscription';
import { LoaderFunctionArgs } from 'react-router';
import { queryClient } from 'shared/queryClient';

export async function PlanLoader({ request, params, context }: LoaderFunctionArgs) {
  // await delay(5000);
  const currentSubscription = await queryClient.ensureQueryData(currentSubscriptionQueryOptions());
  return {
    currentSubscription,
  };
}

export type PlanPageLoaderData = Awaited<ReturnType<typeof PlanLoader>>;

const delay = (ms: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Waited for ${ms} milliseconds`);
    }, ms);
  });
};
