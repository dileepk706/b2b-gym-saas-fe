import { useAuthStore } from '@stores/auth.store';
import { useGymStore } from '@stores/gym.store';
import { gymByIdQueryOptions, gymsQueryOptions } from 'entities/gym/gym.api';
import { queryClient } from 'shared/queryClient';

export async function LoadGyms() {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  if (!useAuthStore.getState().accessToken) {
    return null;
  }

  const gyms = await queryClient.ensureQueryData(gymsQueryOptions());
  const persistedGymId = useGymStore.getState().selectedGymId;
  const selectedGymId =
    gyms.find((gym: any) => gym.id === persistedGymId)?.id ?? gyms[0]?.id ?? null;

  useGymStore.getState().setSelectedGymId(selectedGymId);

  if (selectedGymId) {
    await queryClient.ensureQueryData(gymByIdQueryOptions(selectedGymId));
  }

  return null;
}
