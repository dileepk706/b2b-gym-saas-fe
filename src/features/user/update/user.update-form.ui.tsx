import { Alert, Box, CircularProgress, Stack, Typography, Grid } from '@mui/material';
import { TextField } from 'shared/ui/text-field';
import { ICONS, inconString } from 'shared/ui/iconify/icons';
import Iconify from 'shared/ui/iconify';
import { FactoryButton } from 'shared/ui';
import { useAccountSettings } from 'features/user/update/use-user-update-from';
import { Paper } from 'shared/ui/paper';
import { SPACING } from '@layouts/configLayout';

const SectionHeader = ({ title }: { title: string }) => (
  <Stack direction="row" spacing={2} alignItems="center">
    <Typography variant="h6" fontWeight="600" color="text.primary">
      {title}
    </Typography>
  </Stack>
);

export default function AccountSettingsForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    showPassword,
    setShowPassword,
    loading,
    successMessage,
    mutationErrors,
    isError,
    onSubmit,
  } = useAccountSettings();

  return (
    <Box component="form" onSubmit={onSubmit} noValidate sx={{ width: '100%' }}>
      {successMessage && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {successMessage}
        </Alert>
      )}

      {isError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {mutationErrors.map((err: string) => (
            <div key={err}>{err}</div>
          ))}
        </Alert>
      )}

      <Stack spacing={SPACING}>
        {/* Panel 1: Personal Details */}
        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <SectionHeader title="Personal Details" />
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 0.5,
                      display: 'block',
                      fontWeight: 700,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                    }}
                  >
                    Full Name
                  </Typography>
                  <TextField
                    fullWidth
                    placeholder="Enter your full name"
                    error={!!errors.name}
                    errorMessage={errors.name?.message}
                    disabled={loading}
                    {...register('name')}
                  />
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 0.5,
                      display: 'block',
                      fontWeight: 700,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                    }}
                  >
                    Email
                  </Typography>
                  <TextField
                    fullWidth
                    type="email"
                    placeholder="Enter your email address"
                    error={!!errors.email}
                    errorMessage={errors.email?.message}
                    disabled={loading}
                    {...register('email')}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Panel 2: Change Password */}
        <Paper sx={{ p: { xs: 3, md: 4 } }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <SectionHeader title="Change Password" />
            </Grid>
            <Grid item xs={12} md={8}>
              <Stack spacing={3}>
                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 0.5,
                      display: 'block',
                      fontWeight: 700,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                    }}
                  >
                    Current Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••••••••"
                    error={!!(errors as any).currentPassword}
                    errorMessage={(errors as any).currentPassword?.message}
                    disabled={loading}
                    endIcon={
                      <Iconify
                        icon={showPassword ? inconString.eyeOff : inconString.eye}
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ cursor: 'pointer', color: 'text.secondary' }}
                      />
                    }
                    {...register('currentPassword' as any)}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 0.5,
                      display: 'block',
                      fontWeight: 700,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                    }}
                  >
                    New Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder=""
                    error={!!errors.password}
                    errorMessage={errors.password?.message}
                    disabled={loading}
                    {...register('password')}
                  />
                </Box>

                <Box>
                  <Typography
                    variant="caption"
                    sx={{
                      mb: 0.5,
                      display: 'block',
                      fontWeight: 700,
                      color: 'text.secondary',
                      textTransform: 'uppercase',
                    }}
                  >
                    Confirm Password
                  </Typography>
                  <TextField
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    placeholder=""
                    error={!!(errors as any).confirmPassword}
                    errorMessage={(errors as any).confirmPassword?.message}
                    disabled={loading}
                    {...register('confirmPassword' as any)}
                  />
                </Box>
              </Stack>
            </Grid>
          </Grid>
        </Paper>

        {/* Save Changes Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 1 }}>
          <FactoryButton
            type="submit"
            size="large"
            disabled={loading}
            factoryVariant="primary"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: '600',
              borderRadius: 1,
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Save Changes'}
          </FactoryButton>
        </Box>
      </Stack>
    </Box>
  );
}
