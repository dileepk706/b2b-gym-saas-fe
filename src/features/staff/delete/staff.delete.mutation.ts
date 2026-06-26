import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteStaffById } from 'shared/api/api.services';

export const useDeleteStaffMutation = (options?: { onSuccess?: () => void }) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteStaffById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
  });
};
