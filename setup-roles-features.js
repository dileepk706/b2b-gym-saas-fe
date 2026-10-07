const fs = require('fs');
const path = require('path');

const makeDir = (dir) => {
  const fullPath = path.join(__dirname, 'src', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
};

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, 'src', filePath);
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
};

makeDir('features/roles/create');
makeDir('features/roles/update');
makeDir('features/roles/delete');
makeDir('features/roles/form');

// create
write('features/roles/create/role.create.mutation.ts', `
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRole } from 'shared/api/api.services';
import { CreateRoleDto } from 'shared/api/api.types';
import { toast } from 'sonner';

export function useCreateRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleDto) => createRole(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role created successfully');
    },
    onError: () => {
      toast.error('Failed to create role');
    },
  });
}
`);

write('features/roles/create/use-role-create-form.ts', `
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateRoleDtoSchema } from 'shared/api/api.contracts';
import { CreateRoleDto } from 'shared/api/api.types';

export function useRoleCreateForm() {
  return useForm<CreateRoleDto>({
    resolver: zodResolver(CreateRoleDtoSchema),
    defaultValues: {
      name: '',
    },
  });
}
`);

write('features/roles/create/role.create-form.ui.tsx', `
import { useFormContext } from 'react-hook-form';
import { CreateRoleDto } from 'shared/api/api.types';
import { useCreateRoleMutation } from './role.create.mutation';
import { useRoleCreateForm } from './use-role-create-form';
import { SharedRoleForm } from '../form/shared-role-form.ui';

export function RoleCreateForm() {
  const form = useRoleCreateForm();
  const mutation = useCreateRoleMutation();

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <SharedRoleForm
      form={form}
      onSubmit={onSubmit}
      isPending={mutation.isPending}
      submitLabel="Create Role"
    />
  );
}
`);

write('features/roles/create/index.ts', `
export * from './role.create-form.ui';
`);

// update
write('features/roles/update/role.update.mutation.ts', `
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateRole } from 'shared/api/api.services';
import { CreateRoleDto } from 'shared/api/api.types';
import { toast } from 'sonner';

export function useUpdateRoleMutation(roleId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateRoleDto) => updateRole(roleId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      queryClient.invalidateQueries({ queryKey: ['role', roleId] });
      toast.success('Role updated successfully');
    },
    onError: () => {
      toast.error('Failed to update role');
    },
  });
}
`);

write('features/roles/update/use-role-update-form.ts', `
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { CreateRoleDtoSchema } from 'shared/api/api.contracts';
import { CreateRoleDto } from 'shared/api/api.types';
import { Role } from 'entities/roles/roles.contract';

export function useRoleUpdateForm(defaultValues?: Partial<Role>) {
  return useForm<CreateRoleDto>({
    resolver: zodResolver(CreateRoleDtoSchema),
    defaultValues: {
      name: defaultValues?.name || '',
    },
  });
}
`);

write('features/roles/update/role.update-form.ui.tsx', `
import { CreateRoleDto } from 'shared/api/api.types';
import { useUpdateRoleMutation } from './role.update.mutation';
import { useRoleUpdateForm } from './use-role-update-form';
import { SharedRoleForm } from '../form/shared-role-form.ui';
import { Role } from 'entities/roles/roles.contract';

export function RoleUpdateForm({ role }: { role: Role }) {
  const form = useRoleUpdateForm(role);
  const mutation = useUpdateRoleMutation(role.id);

  const onSubmit = form.handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <SharedRoleForm
      form={form}
      onSubmit={onSubmit}
      isPending={mutation.isPending}
      submitLabel="Update Role"
    />
  );
}
`);

write('features/roles/update/index.ts', `
export * from './role.update-form.ui';
`);

// delete
write('features/roles/delete/role.delete.mutation.ts', `
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteRoleById } from 'shared/api/api.services';
import { toast } from 'sonner';

export function useDeleteRoleMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteRoleById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roles'] });
      toast.success('Role deleted successfully');
    },
    onError: () => {
      toast.error('Failed to delete role');
    },
  });
}
`);

write('features/roles/delete/role-delete-button.ui.tsx', `
import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { useDeleteRoleMutation } from './role.delete.mutation';
import Iconify from 'shared/ui/iconify';
import { ConfirmDialog } from 'shared/ui/custom-dialog';

interface RoleDeleteButtonProps {
  roleId: string;
  roleName: string;
}

export function RoleDeleteButton({ roleId, roleName }: RoleDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const mutation = useDeleteRoleMutation();

  return (
    <>
      <Tooltip title="Delete">
        <IconButton color="error" onClick={() => setOpen(true)}>
          <Iconify icon="mingcute:delete-2-fill" />
        </IconButton>
      </Tooltip>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Role"
        content={<>Are you sure you want to delete <strong>{roleName}</strong>?</>}
        action={
          <IconButton
            color="error"
            onClick={() => {
              mutation.mutate(roleId, {
                onSuccess: () => setOpen(false),
              });
            }}
            disabled={mutation.isPending}
          >
            Delete
          </IconButton>
        }
      />
    </>
  );
}
`);

write('features/roles/delete/index.ts', `
export * from './role-delete-button.ui';
`);

// form shared
write('features/roles/form/shared-role-form.ui.tsx', `
import { FormProvider, UseFormReturn } from 'react-hook-form';
import Stack from '@mui/material/Stack';
import { LoadingButton } from '@mui/lab';
import { RHFTextField } from 'shared/ui/hook-form';

interface SharedRoleFormProps {
  form: UseFormReturn<any>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isPending: boolean;
  submitLabel: string;
}

export function SharedRoleForm({ form, onSubmit, isPending, submitLabel }: SharedRoleFormProps) {
  return (
    <FormProvider {...form}>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <RHFTextField name="name" label="Role Name" />

          <Stack direction="row" justifyContent="flex-end">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={isPending}
            >
              {submitLabel}
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </FormProvider>
  );
}
`);

console.log('Done creating role features');
