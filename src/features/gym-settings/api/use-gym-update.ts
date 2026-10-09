import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGym } from 'shared/api/api.services';
import { UpdateGymDto } from 'shared/api/api.types';
import { useCurrentGymStore } from 'entities/gym/gym.store';

export function useGymUpdate(gymId: string) {
  const queryClient = useQueryClient();
  const { currentGym, setCurrentGym } = useCurrentGymStore();

  return useMutation({
    mutationFn: (data: UpdateGymDto) => updateGym(gymId, data),
    onSuccess: (response, variables) => {
      // Invalidate react-query cache
      queryClient.invalidateQueries({ queryKey: ['gym', gymId] });
      queryClient.invalidateQueries({ queryKey: ['gyms'] });

      // Update zustand store
      const updatedGym = response?.data?.data;
      if (updatedGym) {
        setCurrentGym(updatedGym);
      } else if (currentGym) {
        setCurrentGym({ ...currentGym, ...variables });
      }
    },
  });
}
