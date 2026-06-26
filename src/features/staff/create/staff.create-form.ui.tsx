import { Alert, Box, CircularProgress, Stack } from '@mui/material';
import { TextField } from 'shared/ui/text-field';
import { FactoryButton } from 'shared/ui';
import { Paper } from 'shared/ui/paper';
import { useStaffCreateForm } from './use-staff-create-form';
import { RoleSelect } from 'features/roles/role-select';

// ----------------------------------------------------------------------

export default function StaffCreateForm() {
  const {
    form: {
      register,
      control,
      formState: { errors },
    },
    loading,
    mutationErrors,
    isError,
    onSubmit,
  } = useStaffCreateForm();

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {mutationErrors.map((err: string) => (
            <div key={err}>{err}</div>
          ))}
        </Alert>
      )}

      <Paper sx={{ p: { xs: 2.5, md: 3 } }}>
        <Stack spacing={2}>
          {/* Name */}
          <TextField
            label="Name"
            fullWidth
            placeholder="Enter full name"
            error={!!errors.name}
            errorMessage={errors.name?.message}
            disabled={loading}
            {...register('name')}
          />

          {/* Email */}
          <TextField
            label="Email"
            type="email"
            fullWidth
            placeholder="Enter email address"
            error={!!errors.email}
            errorMessage={errors.email?.message}
            disabled={loading}
            {...register('email')}
          />

          {/* Phone (optional) */}
          <TextField
            label="Phone"
            fullWidth
            placeholder="Enter phone number (optional)"
            error={!!errors.phone}
            errorMessage={errors.phone?.message}
            disabled={loading}
            {...register('phone')}
          />

          {/* Role ID */}
          <RoleSelect
            name="role_id"
            control={control}
            label="Role"
            placeholder="Search and select role"
            disabled={loading}
          />

          {/* Check-in Code (optional) */}
          <TextField
            label="Check-in Code"
            type="number"
            fullWidth
            placeholder="4-digit check-in code (optional)"
            error={!!errors.check_in_code}
            errorMessage={errors.check_in_code?.message}
            disabled={loading}
            {...register('check_in_code', { valueAsNumber: true })}
          />

          {/* Password (optional) */}
          <TextField
            label="Password"
            type="password"
            fullWidth
            placeholder="Min. 6 characters (optional)"
            error={!!errors.password}
            errorMessage={errors.password?.message}
            disabled={loading}
            {...register('password')}
          />
        </Stack>
      </Paper>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
        <FactoryButton type="submit" size="medium" factoryVariant="primary" disabled={loading}>
          {loading ? <CircularProgress size={18} color="inherit" /> : 'Create Staff'}
        </FactoryButton>
      </Box>
    </Box>
  );
}
