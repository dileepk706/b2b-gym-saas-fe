import { Alert, Box, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import { pathKeys } from 'shared/routes';
import { Button } from 'shared/ui/button';
import { TextField } from 'shared/ui/text-field';
import { ICONS, inconString } from '@components/iconify/icons';
import Iconify from '@components/iconify';
import CustomLink from '@components/link/CustomeLink';
import { LogoPng } from '@components/logo';
import { useLoginForm } from './use-login-form';

export default function LoginForm() {
  const {
    form: {
      register,
      formState: { errors },
    },
    showPassword,
    setShowPassword,
    loading,
    mutationErrors,
    isError,
    onSubmit,
  } = useLoginForm();

  return (
    <Box
      component="form"
      onSubmit={onSubmit}
      noValidate
      sx={{ width: '100%', maxWidth: 400, mx: 'auto' }}
    >
      <Stack spacing={3} sx={{ mb: 4, textAlign: 'center' }}>
        <LogoPng size="large" />

        <Stack spacing={1}>
          <Typography variant="h4" fontWeight="700">
            Welcome back
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Sign in to your gym dashboard
          </Typography>
        </Stack>
      </Stack>

      {isError && (
        <Alert severity="error" sx={{ mb: 3 }} data-test="login-error">
          {mutationErrors.map((err: string) => (
            <div key={err}>{err}</div>
          ))}
        </Alert>
      )}

      <Stack spacing={2.5}>
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Email or Mobile Number
          </Typography>
          <TextField
            fullWidth
            placeholder="Email or mobile number"
            error={!!errors.email}
            errorMessage={errors.email?.message}
            data-test="login-email"
            disabled={loading}
            startIcon={ICONS.email}
            {...register('email')}
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
            Password
          </Typography>
          <TextField
            fullWidth
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            error={!!errors.password}
            errorMessage={errors.password?.message}
            data-test="login-password"
            disabled={loading}
            startIcon={ICONS.password}
            endIcon={
              <Iconify
                icon={showPassword ? inconString.eyeOff : inconString.eye}
                onClick={() => setShowPassword(!showPassword)}
                sx={{ cursor: 'pointer' }}
              />
            }
            {...register('password')}
          />
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <CustomLink
            href={pathKeys.root}
            sx={{
              fontWeight: 600,
            }}
          >
            Forgot password?
          </CustomLink>
        </Box>

        <Button
          fullWidth
          type="submit"
          size="large"
          disabled={loading}
          data-test="login-submit"
          appearance="primary"
          sx={{
            fontWeight: 700,
            textTransform: 'none',
          }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Sign In'}
        </Button>
      </Stack>

      <Divider sx={{ my: 4 }}>
        <Typography variant="body2" sx={{ color: 'text.disabled', px: 1 }}>
          OR
        </Typography>
      </Divider>

      <Stack spacing={2} sx={{ textAlign: 'center' }}>
        <Stack flexDirection="row" justifyContent="center" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Don&apos;t have an account?{' '}
          </Typography>
          <CustomLink
            href={pathKeys.register}
            sx={{
              fontWeight: 600,
            }}
          >
            Start free trial
          </CustomLink>
        </Stack>
        <Stack flexDirection="row" justifyContent="center" alignItems="center" spacing={1}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Are you a gym member?{' '}
          </Typography>
          <CustomLink
            href={pathKeys.register}
            sx={{
              fontWeight: 600,
            }}
          >
            Login here
          </CustomLink>
        </Stack>
      </Stack>
    </Box>
  );
}
