import { Suspense } from 'react';
import { Stack, Box, Typography, Container } from '@mui/material';
import { Await, useLoaderData } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Skeleton from 'shared/ui/loading/Skeleton';
import { Paper } from 'shared/ui/paper';
import { SubscriptionPlan } from 'entities/subscription';
import { PlanCard } from 'widgets/subscription-plans/subscription-plans.ui';

export default function BillingPage() {
  const { subscriptionPlansPromise } = useLoaderData() as any;

  return (
    <>
      <Helmet>
        <title>Select a Subscription Plan</title>
      </Helmet>

      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h5" align="center">
            Choose Your Plan
          </Typography>
          <Typography variant="body1" color="text.secondary" align="center" sx={{ maxWidth: 600 }}>
            Select a subscription plan to continue using the application. You can upgrade or
            downgrade at any time.
          </Typography>

          <Suspense fallback={<Skeleton height={400} />}>
            <Await
              resolve={subscriptionPlansPromise}
              errorElement={<Typography color="error">Failed to load plans</Typography>}
            >
              {(data) => <BillingPlans plans={data} />}
            </Await>
          </Suspense>
        </Stack>
      </Container>
    </>
  );
}

function BillingPlans({ plans }: { plans: SubscriptionPlan[] }) {
  if (!plans.length) {
    return (
      <Paper sx={{ p: 3, borderRadius: 1 }}>
        <Typography variant="h5">No subscription plans available</Typography>
      </Paper>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
        gap: 3,
        mt: 4,
      }}
    >
      {plans.map((plan) => (
        <PlanCard key={plan.id} plan={plan} />
      ))}
    </Box>
  );
}
