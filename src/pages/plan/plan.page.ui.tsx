import { Suspense } from 'react';
import { Stack } from '@mui/material';
import { Await, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SubscriptionPlansWidget } from 'widgets/subscription-plans/subscription-plans.ui';
import SelectedPlanPanelWidget from 'widgets/selected-plan/selected-plan.ui';
import Skeleton from 'shared/ui/loading/Skeleton';
import { PlanPageLoaderData } from './plan.loader';

export default function PlanPage() {
  const { subscriptionPlansPromise, currentSubscription } = useLoaderData() as PlanPageLoaderData;

  return (
    <>
      <Helmet>
        <title>Account Plan</title>
      </Helmet>
      <Stack spacing={3}>
        <SelectedPlanPanelWidget subscription={currentSubscription} />

        <Suspense fallback={<Skeleton width={1} height={400} />}>
          <Await resolve={subscriptionPlansPromise} errorElement={<h1>Error from </h1>}>
            {(data) => <SubscriptionPlansWidget plans={data} />}
          </Await>
        </Suspense>
      </Stack>
    </>
  );
}
