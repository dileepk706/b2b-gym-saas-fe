import { Stack } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { PlanPageLoaderData } from './plan.loader';
import { lazy } from 'react';

const CurrentSubscriptionlWidget = lazy(() => import('widgets/current-plan/current-plan.ui'));

export default function PlanPage() {
  const { currentSubscription } = useLoaderData() as PlanPageLoaderData;

  return (
    <>
      <Helmet>
        <title>Account Plan</title>
      </Helmet>
      <Stack spacing={3}>
        <CurrentSubscriptionlWidget subscription={currentSubscription?.data} />
      </Stack>
    </>
  );
}
