/* eslint-disable react/no-unused-prop-types */
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
import { UpgradePlanButton } from 'features/subscription/upgrade-plan';
import { SubscriptionPlan } from 'entities/subscription';
import Iconify from 'shared/ui/iconify';
import { fCurrency } from '@utils/format-number';
import { formatCamelCase } from '@utils/helperFunctions';

// ----------------------------------------------------------------------

type Props = {
  plans: SubscriptionPlan[];
  selectedPlan?: SubscriptionPlan | null;
};

export function SubscriptionPlansWidget({ plans, selectedPlan }: Props) {
  if (!plans.length) {
    return (
      <Paper sx={{ p: 3, borderRadius: 1 }}>
        <Typography variant="h5">No subscription plans available</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          Subscription plans will appear here once the backend returns plan data.
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Upgrade Plan
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, minmax(0, 1fr))' },
          gap: 2,
        }}
      >
        {plans.map((plan) => (
          <PlanCard
            key={plan.id}
            plan={plan}
            isSelected={plan.id === selectedPlan?.id}
            onSelect={() => {}}
          />
        ))}
      </Box>
    </Box>
  );
}

type PlanCardProps = {
  plan: SubscriptionPlan;
  isSelected: boolean;
  onSelect: (planId: string) => void;
};

function PlanCard({ plan, isSelected, onSelect }: PlanCardProps) {
  return (
    <Paper
      sx={{
        p: 2.5,
        borderRadius: 1,
        border: (theme) =>
          `1px solid ${
            isSelected ? theme.palette.primary.main : alpha(theme.palette.grey[500], 0.16)
          }`,
        boxShadow: isSelected
          ? (theme) => `0 12px 28px ${alpha(theme.palette.primary.main, 0.16)}`
          : 'none',
      }}
    >
      <Stack spacing={2} sx={{ height: 1 }}>
        <Stack spacing={1}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
            <Typography variant="h5">{plan.name}</Typography>
            {isSelected && <Chip size="small" color="primary" label="Selected" />}
          </Stack>

          <Stack direction="row" alignItems="baseline" spacing={0.5}>
            <Typography variant="h3">{fCurrency(plan.price)}</Typography>
            <Typography variant="body2" color="text.secondary">
              / cycle
            </Typography>
          </Stack>
        </Stack>

        <FeatureList plan={plan} compact />

        <PlanLimits plan={plan} />

        <Box sx={{ mt: 'auto' }}>
          <UpgradePlanButton planId={plan.id} isCurrent={isSelected} onSelect={onSelect} />
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
    <Stack spacing={1}>
      {!compact && (
        <Typography variant="subtitle2" color="text.secondary">
          Included features
        </Typography>
      )}

      {plan.features?.map((feature) => (
        <Stack key={feature.id} direction="row" alignItems="center" spacing={1}>
          <Iconify icon="solar:check-circle-bold" width={18} sx={{ color: 'success.main' }} />
          <Typography variant="body2">{formatCamelCase(feature.name)}</Typography>
        </Stack>
      ))}
    </Stack>
  );
}

export function PlanLimits({ plan }: PlanDetailsProps) {
  return (
    <Stack spacing={1}>
      <Typography variant="subtitle2" color="text.secondary">
        Limits
      </Typography>

      {plan.limits.map((limit) => (
        <Stack key={limit.key} direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="body2">{formatLimitKey(limit.key)}</Typography>
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
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
