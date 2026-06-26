import { Stack } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { lazy } from 'react';
import { useSubscriptionStore } from 'entities/subscription';

const CurrentSubscriptionlWidget = lazy(() => import('widgets/current-plan/current-plan.ui'));

export default function PlanPage() {
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
