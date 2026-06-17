/* eslint-disable react/no-unused-prop-types */
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { UpgradePlanButton } from 'features/subscription/upgrade-plan';
import { SubscriptionPlan } from 'entities/subscription';
import Iconify from 'shared/ui/iconify';
import { fCurrency } from '@utils/format-number';
import { formatCamelCase } from '@utils/format-text';
import { Paper } from 'shared/ui/paper';
import { CheckoutPlanButton } from 'features/subscription/checkout/checkout-button.ui';

// ----------------------------------------------------------------------

type Props = {
  plans: SubscriptionPlan[];
  selectedPlan?: SubscriptionPlan | null;
};

type PlanCardProps = {
  plan: SubscriptionPlan;
  isSelected?: boolean;
};

export function PlanCard({ plan, isSelected }: PlanCardProps) {
  return (
    <Paper
      sx={{
        p: 2,
      }}
      isSelected={isSelected}
    >
      <Stack spacing={1.5} sx={{ height: 1 }}>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>{formatCamelCase(plan.name)}</Typography>
            {isSelected && <Chip size="small" color="primary" label="Selected" sx={{ height: 20, fontSize: '0.7rem' }} />}
          </Stack>

          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Typography variant="h6">{fCurrency(plan.price)}</Typography>
            <Typography variant="caption" color="text.secondary">
              / Month
            </Typography>
          </Stack>
        </Stack>

        <FeatureList plan={plan} compact />

        <PlanLimits plan={plan} />

        <Box sx={{ mt: 'auto' }}>
          <CheckoutPlanButton planId={plan.id} />
        </Box>
      </Stack>
    </Paper>
  );
}

type PlanDetailsProps = {
  plan: SubscriptionPlan;
  compact?: boolean;
};

export function FeatureList({ plan, compact = false }: PlanDetailsProps) {
  return (
    <Stack spacing={0.75}>
      {!compact && (
        <Typography variant="subtitle2" color="text.secondary">
          Included features
        </Typography>
      )}

      {plan.features?.map((feature) => (
        <Stack key={feature.id} direction="row" alignItems="center" spacing={0.75}>
          <Iconify icon="solar:check-circle-bold" width={14} sx={{ color: 'success.main' }} />
          <Typography variant="caption">{formatCamelCase(feature.name)}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export function PlanLimits({ plan }: PlanDetailsProps) {
  return (
    <Stack spacing={0.75}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
        Limits
      </Typography>

      {plan.limits.map((limit) => (
        <Stack key={limit.key} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="caption">{formatLimitKey(limit.key)}</Typography>
          <Typography variant="caption" sx={{ fontWeight: 600 }}>
            {limit.value ?? 'Unlimited'}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
}

function formatLimitKey(key: string) {
  return key
    .replace(/^max_/, '')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
