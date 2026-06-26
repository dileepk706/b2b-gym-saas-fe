import { Alert, Box, CircularProgress, Stack, Typography } from '@mui/material';
import { TextField } from 'shared/ui/text-field';
import { FactoryButton } from 'shared/ui';
import { Paper } from 'shared/ui/paper';
import { RoleSelect } from 'features/roles/role-select';
import { UseFormReturn } from 'react-hook-form';
import { Staffs } from 'entities/staff/staff.contracts';

interface SharedStaffFormProps {
  form: UseFormReturn<any>;
  loading: boolean;
  mutationErrors: string[];
  isError: boolean;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  title: string;
  submitText: string;
  currentStaff?: Staffs;
}

export function SharedStaffForm({
  form: { register, control, formState: { errors } },
  loading,
  mutationErrors,
  isError,
  onSubmit,
  title,
  submitText,
}: SharedStaffFormProps) {
  return (
    <Paper sx={{ p: { xs: 2.5, md: 3 } }}>
      <Box component="form" onSubmit={onSubmit} noValidate>
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {mutationErrors.map((err: string) => (
              <div key={err}>{err}</div>
            ))}
          </Alert>
        )}

        <Stack spacing={3} sx={{ mb: 4, textAlign: 'center' }}>
          <Typography variant="h4" fontWeight="700">
            {title}
          </Typography>
        </Stack>

        <Stack spacing={2}>
          <TextField
            label="Name"
            fullWidth
            placeholder="Enter full name"
            error={!!errors.name}
            errorMessage={errors.name?.message as string}
            disabled={loading}
            {...register('name')}
          />

          <TextField
            label="Email"
            type="email"
            fullWidth
            placeholder="Enter email address"
            error={!!errors.email}
            errorMessage={errors.email?.message as string}
            disabled={loading}
            {...register('email')}
          />

          <TextField
            label="Phone"
            fullWidth
            placeholder="Enter phone number (optional)"
            error={!!errors.phone}
            errorMessage={errors.phone?.message as string}
            disabled={loading}
            {...register('phone')}
          />

          <RoleSelect
            name="role_id"
            control={control}
            label="Role"
            placeholder="Search and select role"
            disabled={loading}
          />

          <TextField
            label="Check-in Code"
            type="number"
            fullWidth
            placeholder="4-digit check-in code (optional)"
            error={!!errors.check_in_code}
            errorMessage={errors.check_in_code?.message as string}
            disabled={loading}
            {...register('check_in_code', { valueAsNumber: true })}
          />

          <TextField
            label="Password"
            type="password"
            fullWidth
            placeholder="Min. 6 characters (optional)"
            error={!!errors.password}
            errorMessage={errors.password?.message as string}
            disabled={loading}
            {...register('password')}
          />
        </Stack>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <FactoryButton type="submit" size="medium" factoryVariant="primary" disabled={loading}>
            {loading ? <CircularProgress size={18} color="inherit" /> : submitText}
          </FactoryButton>
        </Box>
      </Box>
    </Paper>
  );
}
