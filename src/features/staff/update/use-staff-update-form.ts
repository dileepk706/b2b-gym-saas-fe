import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useNavigate } from 'react-router-dom';
import { getErrorMessages } from 'shared/api/api.lib';
import { pathKeys } from 'shared/routes';
import { updateStaffSchema, UpdateStaffDto } from './staff.update.contracts';
import { useUpdateStaffMutation } from './staff.update.mutation';
import { Staffs } from 'entities/staff/staff.contracts';

export function useStaffUpdateForm(currentStaff: Staffs) {
  const navigate = useNavigate();

  const form = useForm<UpdateStaffDto>({
    mode: 'onTouched',
    resolver: standardSchemaResolver(updateStaffSchema),
    defaultValues: {
      name: currentStaff.name || '',
      email: currentStaff.email || '',
      phone: currentStaff.phone || '',
      role_id: currentStaff.role_id || '',
      check_in_code: currentStaff.check_in_code || undefined,
      password: '', // do not prepopulate password
    },
  });

  const mutation = useUpdateStaffMutation(currentStaff.id, {
    onSuccess() {
      navigate(pathKeys.staff.root);
    },
  });

  const loading = mutation.isPending || form.formState.isSubmitting;

  const onValid = (data: UpdateStaffDto) => {
    const payload: Partial<UpdateStaffDto> = {
      name: data.name,
      email: data.email,
      role_id: data.role_id,
    };

    if (data.phone && data.phone.trim() !== '') {
      payload.phone = data.phone.trim();
    }
    if (data.password && data.password.trim() !== '') {
      payload.password = data.password;
    }
    if (data.check_in_code !== undefined && !isNaN(data.check_in_code as number)) {
      payload.check_in_code = data.check_in_code;
    }

    mutation.mutate(payload);
  };

  return {
    form,
    loading,
    mutationErrors: getErrorMessages(mutation.error),
    isError: mutation.isError,
    isSuccess: mutation.isSuccess,
    onSubmit: form.handleSubmit(onValid),
  };
}
