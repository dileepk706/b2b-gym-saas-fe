import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateStaff } from 'shared/api/api.services';
import { UpdateStaffDto } from './staff.update.contracts';

export const useUpdateStaffMutation = (
  staffId: string,
  options?: { onSuccess?: () => void }
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: Partial<UpdateStaffDto>) => updateStaff(staffId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      queryClient.invalidateQueries({ queryKey: ['staff', staffId] });
      if (options?.onSuccess) {
        options.onSuccess();
      }
    },
  });
};
