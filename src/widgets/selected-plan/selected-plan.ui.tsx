/* eslint-disable react/no-unused-prop-types */
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { fCurrency } from '@utils/format-number';
import { SubscriptionResponseDto } from 'shared/api/api.types';
import { FeatureList } from 'widgets/subscription-plans/subscription-plans.ui';

type SelectedPlanPanelProps = {
  subscription?: SubscriptionResponseDto['data'] | null;
};

export default function SelectedPlanPanelWidget({ subscription }: SelectedPlanPanelProps) {
  if (!subscription || !subscription.plan) {
    return (
      <Paper sx={{ p: 3, borderRadius: 1 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={3}>
          <Stack spacing={1.5}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography variant="h4">Selected Plan</Typography>
              <Chip size="small" color="warning" label="Trial" />
            </Stack>

            <Typography variant="body2" color="text.secondary">
              Review included features and limits before upgrading your account.
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    );
  }

  console.log(subscription);

  return (
    <Paper sx={{ p: 3, borderRadius: 1 }}>
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" spacing={3}>
        <Stack spacing={1.5}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography variant="h4">Selected Plan</Typography>
            <Chip size="small" color="primary" label={subscription.plan.name} />
          </Stack>

          <Typography variant="body2" color="text.secondary">
            Review included features and limits before upgrading your account.
          </Typography>

          <FeatureList plan={subscription.plan} />
        </Stack>

        <Stack
          spacing={1}
          sx={{
            minWidth: { xs: '100%', md: 220 },
            p: 2,
            borderRadius: 1,
            bgcolor: (theme) => alpha(theme.palette.primary.main, 0.08),
          }}
        >
          <Typography variant="caption" color="text.secondary">
            Plan price
          </Typography>
          <Typography variant="h3" sx={{ lineHeight: 1 }}>
            {fCurrency(subscription.plan.price)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Per billing cycle
          </Typography>
        </Stack>
      </Stack>
    </Paper>
  );
}
