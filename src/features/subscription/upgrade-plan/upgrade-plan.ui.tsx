// import Button from '@mui/material/Button';
import { useSubscriptionMutation } from 'features/subscription/upgrade-plan/subscription.mutation';
import { currentSubscriptionQueryOptions } from 'entities/subscription/subscription.api';
import { queryClient } from 'shared/queryClient';
import { Button } from 'shared/ui';
import Iconify from 'shared/ui/iconify';

// ----------------------------------------------------------------------

type Props = {
  planId: string;
  isCurrent?: boolean;
  onSelect: (planId: string) => void;
};

export function UpgradePlanButton({ planId, isCurrent = false, onSelect }: Props) {
  const mutation = useSubscriptionMutation({
    async onSuccess() {
      await queryClient.fetchQuery(currentSubscriptionQueryOptions());
    },
  });

  const onSubmit = (plan_id: string) => {
    mutation.mutate({ plan_id });
  };

  if (isCurrent) {
    return (
      <Button fullWidth disabled variant="outlined">
        Selected plan
      </Button>
    );
  }

  return (
    <Button
      fullWidth
      appearance="primary"
      borderRadius={1}
      onClick={() => onSubmit(planId)}
      startIcon={<Iconify icon="solar:bolt-bold" />}
    >
      Upgrade plan
    </Button>
  );
}
