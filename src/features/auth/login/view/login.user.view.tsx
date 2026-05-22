import { useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { ErrorBoundary } from 'react-error-boundary';
import { logError } from '@components/error-handler/error-handler.lib';
import { ErrorHandler } from '@components/error-handler/error-handler.ui';
import { pathKeys } from 'shared/routes';
import { Alert, Box, CircularProgress, Typography, Stack, Divider } from '@mui/material';
import TextField from '@components/text-field/text-field';
import { ICONS, inconString } from '@components/iconify/icons';
import Button from '@components/button/Button';
import Iconify from '@components/iconify';
import { useSearchParams, useRouter } from '@routes/hook';
import CustomLink from '@components/link/CustomeLink';
import { LogoPng } from '@components/logo';
import { getErrorMessages } from 'shared/api/api.lib';
import AuthViewWraper from 'features/auth/components/AuthVIewWraper';
import { LoginUser } from '../login.types';
import { LoginUserSchema } from '../login.contracts';
import { useLoginMutation } from '../login.user.mutation';
//

export default function LoginUserView() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
      <BaseLoginForm />
    </ErrorBoundary>
  );
}

function BaseLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const returnTo = searchParams.get('returnTo');
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUser>({
    mode: 'onTouched',
    resolver: standardSchemaResolver(LoginUserSchema),
    defaultValues: { email: 'dlpkmr706@gmail.com', password: '11111111' },
  });

  const { mutate, isPending, isError, error } = useLoginMutation({
    onSuccess() {
      router.replace(returnTo || pathKeys.root);
    },
  });

  const mutationErrors = getErrorMessages(error);
  const loading = isPending || isSubmitting;

  const onValid = (loginUser: LoginUser) => {
    mutate(loginUser);
  };

  return (
    <AuthViewWraper>
      <Box
        component="form"
        onSubmit={handleSubmit(onValid)}
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
    </AuthViewWraper>
  );
}
