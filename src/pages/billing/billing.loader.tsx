import { subscriptionPlansQueryOptions } from 'entities/subscription';
import { LoaderFunctionArgs, defer } from 'react-router-dom';
import { queryClient } from 'shared/queryClient';

export async function BillingLoader({ request, params, context }: LoaderFunctionArgs) {
  const subscriptionPlansPromise = queryClient
    .fetchQuery(subscriptionPlansQueryOptions())
    .then((response) => response);

  return defer({
    subscriptionPlansPromise,
  });
}

export type BillingPageLoaderData = Awaited<ReturnType<typeof BillingLoader>>;
