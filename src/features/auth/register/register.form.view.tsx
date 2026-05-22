import { useState } from 'react';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { useForm } from 'react-hook-form';
import { ErrorBoundary } from 'react-error-boundary';
import { logError } from '@components/error-handler/error-handler.lib';
import { ErrorHandler } from '@components/error-handler/error-handler.ui';
import { pathKeys } from 'shared/routes';
import {
  Checkbox,
  FormControlLabel,
  IconButton,
  Alert,
  Box,
  CircularProgress,
  Typography,
  Link,
  Stack,
} from '@mui/material';
import TextField from '@components/text-field/text-field';
import { ICONS, inconString } from '@components/iconify/icons';
import Button from '@components/button/Button';
import AuthViewWraper from 'features/auth/components/AuthVIewWraper';
import Iconify from '@components/iconify';
import { useRouter } from '@routes/hook';
import { LogoPng } from '@components/logo';
import CustomLink from '@components/link/CustomeLink';
import { getErrorMessages } from 'shared/api/api.lib';
import TextFieldLabel from '@components/text-field/text-field-label';
import { TRegisterUser } from './register.types';
import { RegisterUserSchema } from './register.contracts';
import { useRegisterMutation } from './register.mutation';

export default function RegisterFormView() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
      <BaseRegisterForm />
    </ErrorBoundary>
  );
}

function BaseRegisterForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterUser>({
    mode: 'onTouched',
    resolver: standardSchemaResolver(RegisterUserSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreedToTerms: false,
    },
  });

  const { mutate, isPending, isError, error } = useRegisterMutation({
    onSuccess() {
      router.replace(pathKeys.root);
    },
  });

  const mutationErrors = getErrorMessages(error);
  const loading = isPending || isSubmitting;

  const onValid = (registerData: TRegisterUser) => {
    mutate(registerData);
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
          <LogoPng />
          <Stack spacing={1}>
            <Typography variant="h4" fontWeight="700">
              Create your account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Start your free trial or subscribe today
            </Typography>
          </Stack>
        </Stack>

        {isError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {mutationErrors.map((err: string) => (
              <div key={err}>{err}</div>
            ))}
          </Alert>
        )}

        <Stack spacing={2.5}>
          <Box>
            <TextFieldLabel
              fullWidth
              label="Full Name"
              placeholder="John Doe"
              error={!!errors.name}
              errorMessage={errors.name?.message}
              disabled={loading}
              startIcon={<Iconify icon={inconString.user} />}
              {...register('name')}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Email
            </Typography>
            <TextField
              fullWidth
              placeholder="you@example.com"
              error={!!errors.email}
              errorMessage={errors.email?.message}
              disabled={loading}
              startIcon={<Iconify icon={inconString.email} />}
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
              placeholder="Create a strong password"
              error={!!errors.password}
              errorMessage={errors.password?.message}
              disabled={loading}
              startIcon={<Iconify icon="solar:lock-bold-duotone" />}
              endIcon={
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? inconString.eyeOff : inconString.eye} />
                </IconButton>
              }
              {...register('password')}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>
              Confirm Password
            </Typography>
            <TextField
              fullWidth
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              error={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              disabled={loading}
              startIcon={<Iconify icon="solar:lock-bold-duotone" />}
              endIcon={
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? inconString.eyeOff : inconString.eye} />
                </IconButton>
              }
              {...register('confirmPassword')}
            />
          </Box>

          <Box>
            <FormControlLabel
              control={<Checkbox {...register('agreedToTerms')} />}
              label={
                <Typography variant="body2">
                  I agree to the <Link sx={{ cursor: 'pointer' }}>Terms of Service</Link> and{' '}
                  <Link sx={{ cursor: 'pointer' }}>Privacy Policy</Link>
                </Typography>
              }
            />
            {errors.agreedToTerms && (
              <Typography variant="caption" color="error" sx={{ mt: 0.5, display: 'block' }}>
                {errors.agreedToTerms.message}
              </Typography>
            )}
          </Box>

          <Button
            fullWidth
            type="submit"
            size="large"
            disabled={loading}
            appearance="primary"
            endIcon={ICONS.arrowRight}
            sx={{
              fontWeight: 700,
              textTransform: 'none',
            }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Create your account'}
          </Button>
        </Stack>

        <Stack spacing={2} sx={{ mt: 3, textAlign: 'center' }}>
          <Stack flexDirection="row" justifyContent="center" alignItems="center" spacing={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Already have an account?{' '}
            </Typography>
            <CustomLink
              href={pathKeys.login}
              sx={{
                fontWeight: 600,
              }}
            >
              Sign in
            </CustomLink>
          </Stack>

          <Stack direction="row" spacing={3} justifyContent="center" sx={{ pt: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Iconify icon="solar:lock-bold-duotone" sx={{ color: 'text.disabled' }} />
              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="left"
                sx={{ maxWidth: 100 }}
              >
                Your data is secure and encrypted
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Iconify
                icon="solar:users-group-rounded-bold-duotone"
                sx={{ color: 'text.disabled' }}
              />
              <Typography
                variant="caption"
                color="text.secondary"
                textAlign="left"
                sx={{ maxWidth: 100 }}
              >
                Trusted by 100+ gyms across India
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </AuthViewWraper>
  );
}
