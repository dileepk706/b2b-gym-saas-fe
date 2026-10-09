import { LoaderFunctionArgs } from 'react-router-dom';
import { queryClient } from 'shared/queryClient';
import { useCurrentGymStore } from 'entities/gym/gym.store';
import { gymByIdQueryOptions } from 'entities/gym/gym.api';

export async function GymSettingsLoader({ params }: LoaderFunctionArgs) {
  const { currentGym } = useCurrentGymStore.getState();
  const gym = await queryClient.ensureQueryData(gymByIdQueryOptions(currentGym?.id || ''));

  return {
    gym,
  };
}
