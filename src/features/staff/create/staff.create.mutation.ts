import {
  useMutation,
  UseMutationOptions,
  DefaultError,
  useQueryClient,
} from '@tanstack/react-query';
import { createStaff } from 'shared/api/api.services';
import { CreateStaffDto } from './staff.create.contracts';
import { ApiResponse } from 'shared/api/api.types';

export function useCreateStaffMutation(
  options: Partial<
    UseMutationOptions<ApiResponse<unknown>, DefaultError, CreateStaffDto, unknown>
  > = {}
) {
  const { mutationKey = [], onSuccess, onError, onSettled, onMutate } = options;
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['staff', 'create', ...mutationKey],
    mutationFn: async (dto: CreateStaffDto) => {
      const response = await createStaff(dto);
      return response.data;
    },
    onMutate,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries({ queryKey: ['staffs'] });
      if (onSuccess) {
        onSuccess(data, variables, context, undefined as any);
      }
    },
    onError,
    onSettled,
  });
}
