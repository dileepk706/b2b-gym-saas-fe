import { Container, Stack } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PlanPageLoaderData } from './plan.loader';
import { lazy } from 'react';
import { useSubscriptionStore } from 'entities/subscription';

const CurrentSubscriptionlWidget = lazy(() => import('widgets/current-plan/current-plan.ui'));

export default function PlanPage() {
  const { currentSubscription } = useLoaderData() as PlanPageLoaderData;
  const { subscription, invoice, plan } = useSubscriptionStore.getState();
  return (
    <>
      <Helmet>
        <title>Account Plan</title>
      </Helmet>
      <Stack>
        <CurrentSubscriptionlWidget subscription={subscription} invoice={invoice} plan={plan} />
      </Stack>
    </>
  );
}
