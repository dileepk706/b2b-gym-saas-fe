/* eslint-disable react/no-unused-prop-types */
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { alpha } from '@mui/material/styles';
import { fCurrency } from '@utils/format-number';
import { fDate } from '@utils/format-time';
import { CurrentSubscriptionResponseDto } from 'shared/api/api.types';
import { Paper } from 'shared/ui/paper';
import { FeatureList } from 'widgets/subscription-plans/subscription-plans.ui';
import { FactoryButton } from 'shared/ui';
import { useRouter } from '@routes/hook';
import { pathKeys } from 'shared/routes';

type SelectedPlanPanelProps = {
  subscription?: CurrentSubscriptionResponseDto['data'];
};

export default function CurrentSubscriptionlWidget({ subscription }: SelectedPlanPanelProps) {
  const router = useRouter();
  // Resolve Limits and usage
  const planLimits = subscription?.plan?.limits || [];

  // Extract limits
  const branchLimit = planLimits.find((l) => l.key.toLowerCase().includes('branch'))?.value ?? 5;
  const memberLimit = planLimits.find((l) => l.key.toLowerCase().includes('member'))?.value ?? 500;
  const staffLimit = planLimits.find((l) => l.key.toLowerCase().includes('staff'))?.value ?? 15;

  // Extract usage (using tenant count fields or fallback to mock data)
  const branchUsed = 3;
  const memberUsed = 120;
  const staffUsed = 8;

  if (!subscription || !subscription.plan) {
    return (
      <Stack spacing={2}>
        <Paper sx={{ p: 2 }}>
          <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
            {/* Left side: Billing Details (Fallback State) */}
            <Stack spacing={1.5} sx={{ flex: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ borderBottom: '1px solid', borderColor: 'divider', pb: 1 }}
              >
                Plan Billing Details
              </Typography>
              <Stack spacing={1}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Billing Status
                  </Typography>
                  <Chip
                    size="small"
                    color="warning"
                    label="No Active Plan"
                    sx={{ height: 20, fontSize: '0.7rem' }}
                  />
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Cycle
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    N/A
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="caption" color="text.secondary">
                    Workspace
                  </Typography>
                  <Typography variant="caption" sx={{ fontWeight: 600 }}>
                    Trial Workspace
                  </Typography>
                </Stack>
              </Stack>
            </Stack>

            {/* Right side: Subscribed Plan (Fallback State) */}
            <Stack
              spacing={1.5}
              sx={{
                flex: 1,
                p: 2,
                borderRadius: 1,
                bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                border: '1px dashed',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.2),
              }}
            >
              <Typography variant="subtitle2" color="primary.main">
                No Subscribed Plan
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Please upgrade your account to unlock additional features and increase limits.
              </Typography>
              <Box sx={{ mt: 'auto' }}>
                <FactoryButton
                  fullWidth
                  factoryVariant="primary"
                  onClick={() => router.push(pathKeys.billing)}
                >
                  Choose a Plan
                </FactoryButton>
              </Box>
            </Stack>
          </Stack>
        </Paper>

        {/* Usage status section */}
        <Paper sx={{ p: 2 }}>
          <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
            Usage Status
          </Typography>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
              gap: 2,
            }}
          >
            <UsageBar title="Branches" used={branchUsed} limit={branchLimit} />
            <UsageBar title="Members" used={memberUsed} limit={memberLimit} />
            <UsageBar title="Staffs" used={staffUsed} limit={staffLimit} />
          </Box>
        </Paper>
      </Stack>
    );
  }

  const sub = subscription.subscription;
  const status = sub?.status || 'inactive';

  return (
    <Stack spacing={2}>
      {/* Billing Summary Section */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ mb: 1.5, fontWeight: 600 }}>
          Billing Summary
        </Typography>

        <Stack direction={{ xs: 'column', md: 'row' }} spacing={2.5}>
          {/* Left side: Plan Billing Details */}
          <Stack spacing={1.5} sx={{ flex: 1 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Billing Status
                </Typography>
                <Chip
                  size="small"
                  color={status === 'active' ? 'success' : 'warning'}
                  label={status.toUpperCase()}
                  sx={{ fontWeight: 600, fontSize: '0.65rem', height: 20 }}
                />
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Price
                </Typography>
                <Typography variant="caption">
                  {fCurrency(subscription.invoice?.amount && 0)}
                </Typography>
              </Stack>

              {sub?.current_period_start && (
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="caption" color="text.secondary">
                    Start Date
                  </Typography>
                  <Typography variant="caption">
                    {sub?.current_period_start
                      ? fDate(sub.current_period_start)
                      : 'No Active Subscription'}
                  </Typography>
                </Stack>
              )}

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Next Payment Date
                </Typography>
                <Typography variant="caption">
                  {sub.current_period_end
                    ? fDate(sub.current_period_end)
                    : 'No Active Subscription'}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Typography variant="caption" color="text.secondary">
                  Payment Method
                </Typography>
                <Typography variant="caption">No Active Subscription</Typography>
              </Stack>
            </Stack>
          </Stack>

          {/* Right side: Subscribed Plan Details */}
          <Stack
            spacing={1.5}
            sx={{
              flex: 1,
              p: 2,
              borderRadius: 1,
              bgcolor: (theme) => alpha(theme.palette.primary.main, 0.05),
              border: '1px solid',
              borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
            }}
          >
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {subscription.plan.name}
              </Typography>
              <Typography variant="subtitle2" color="primary.main" sx={{ fontWeight: 700 }}>
                {fCurrency(subscription.plan.price)}
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                  sx={{ ml: 0.5, fontSize: '0.65rem' }}
                >
                  / cycle
                </Typography>
              </Typography>
            </Stack>

            <Box
              sx={{
                py: 0.75,
                borderTop: '1px solid',
                borderBottom: '1px solid',
                borderColor: (theme) => alpha(theme.palette.primary.main, 0.1),
              }}
            >
              <FeatureList plan={subscription.plan} compact />
            </Box>

            <Box>
              <FactoryButton factoryVariant="primary" onClick={() => router.push(pathKeys.billing)}>
                Upgrade Plan
              </FactoryButton>
            </Box>
          </Stack>
        </Stack>
      </Paper>

      {/* Usage Status Section */}
      <Paper sx={{ p: 2 }}>
        <Typography variant="subtitle2" sx={{ mb: 1.5, fontWeight: 600 }}>
          Usage Status
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
            gap: 2.5,
          }}
        >
          <UsageBar title="Branches" used={branchUsed} limit={branchLimit} />
          <UsageBar title="Members" used={memberUsed} limit={memberLimit} />
          <UsageBar title="Staffs" used={staffUsed} limit={staffLimit} />
        </Box>
      </Paper>
    </Stack>
  );
}

type UsageBarProps = {
  title: string;
  used: number;
  limit: number | null;
};

function UsageBar({ title, used, limit }: UsageBarProps) {
  const isUnlimited = limit === null;
  const percentage = isUnlimited ? 100 : Math.min(100, Math.round((used / limit) * 100));

  // Determine progress color based on usage percentage
  let progressColor: 'primary' | 'secondary' | 'error' | 'warning' | 'success' = 'success';
  if (!isUnlimited) {
    if (percentage >= 90) progressColor = 'error';
    else if (percentage >= 75) progressColor = 'warning';
    else progressColor = 'success';
  } else {
    progressColor = 'primary';
  }

  return (
    <Stack spacing={0.75}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {used} / {isUnlimited ? 'Unlimited' : limit}
        </Typography>
      </Stack>
      <Box sx={{ width: '100%' }}>
        <LinearProgress
          variant="determinate"
          value={percentage}
          color={progressColor}
          sx={{
            height: 6,
            borderRadius: 3,
            bgcolor: (theme) => alpha(theme.palette.text.primary, 0.06),
            '& .MuiLinearProgress-bar': {
              borderRadius: 3,
            },
          }}
        />
      </Box>
    </Stack>
  );
}
