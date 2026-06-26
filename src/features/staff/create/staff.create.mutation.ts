import { useMutation, UseMutationOptions, DefaultError } from '@tanstack/react-query';
import { createStaff } from 'shared/api/api.services';
import { CreateStaffDto } from './staff.create.contracts';
import { ApiResponse } from 'shared/api/api.types';

export function useCreateStaffMutation(
  options: Partial<UseMutationOptions<ApiResponse<unknown>, DefaultError, CreateStaffDto, unknown>> = {}
) {
  const { mutationKey = [], onSuccess, onError, onSettled, onMutate } = options;

  return useMutation({
    mutationKey: ['staff', 'create', ...mutationKey],
    mutationFn: async (dto: CreateStaffDto) => {
      const response = await createStaff(dto);
      return response.data;
    },
    onMutate,
    onSuccess,
    onError,
    onSettled,
  });
}
