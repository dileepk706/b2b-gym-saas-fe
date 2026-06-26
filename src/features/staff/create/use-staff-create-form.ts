import { useForm } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useNavigate } from 'react-router-dom';
import { getErrorMessages } from 'shared/api/api.lib';
import { pathKeys } from 'shared/routes';
import { createStaffSchema, CreateStaffDto } from './staff.create.contracts';
import { useCreateStaffMutation } from './staff.create.mutation';

export function useStaffCreateForm() {
  const navigate = useNavigate();

  const form = useForm<CreateStaffDto>({
    mode: 'onTouched',
    resolver: standardSchemaResolver(createStaffSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      role_id: '',
      password: '',
    },
  });

  const mutation = useCreateStaffMutation({
    onSuccess() {
      navigate(pathKeys.staff.root);
    },
  });

  const loading = mutation.isPending || form.formState.isSubmitting;

  const onValid = (data: CreateStaffDto) => {
    // Strip optional empty string fields before submitting
    const payload: Partial<CreateStaffDto> = {
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

    mutation.mutate(payload as CreateStaffDto);
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
