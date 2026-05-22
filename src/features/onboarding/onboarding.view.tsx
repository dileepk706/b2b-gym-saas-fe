import { useState } from 'react';
import { Box } from '@mui/material';
import { useForm, FormProvider } from 'react-hook-form';
import { standardSchemaResolver } from '@hookform/resolvers/standard-schema';
import { getErrorMessages } from 'shared/api/api.lib';
import AuthViewWraper from 'features/auth/components/AuthVIewWraper';
import { useAuthContext } from '@auth/hooks';
import { pathKeys } from 'shared/routes';
import { useRouter } from '@routes/hook';
import { TOnboarding } from './onboarding.types';
import { OnboardingSchema } from './onboarding.contracts';
import { useOnboardingMutation } from './onboarding.mutation';
import GymCreateForm from './forms/form.gym-create';
import { STEPS } from './components/onboarding-stepper';

export default function OnboardingView() {
  const [activeStep, setActiveStep] = useState(0);

  const methods = useForm<TOnboarding>({
    mode: 'onTouched',
    resolver: standardSchemaResolver(OnboardingSchema),
    defaultValues: {
      name: '',
      gym_url: '',
      city: '',
      address: '',
    },
  });

  const { handleSubmit } = methods;
  const { refreshProfile } = useAuthContext();
  const router = useRouter();

  const {
    mutate: onboardingMutation,
    isError,
    error,
    isPending,
  } = useOnboardingMutation({
    async onSuccess() {
      await refreshProfile();
      router.push(pathKeys.dashboard().root);
    },
  });
  const mutationErrors = getErrorMessages(error);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep((prevActiveStep) => prevActiveStep - 1);
    }
  };

  const onSubmit = (data: TOnboarding) => {
    if (activeStep < STEPS.length - 1) {
      handleNext();
    } else {
      onboardingMutation(data);
    }
  };

  return (
    <AuthViewWraper>
      {/* <OnboardingStepper activeStep={activeStep} /> */}
      <FormProvider {...methods}>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ width: '100%', mx: 'auto' }}
        >
          <GymCreateForm isError={isError} mutationErrors={mutationErrors} loading={isPending} />

          {/* {activeStep === 1 && (
            <Box>
              Choose Plan Component (Coming Soon)
              <Box onClick={handleBack} sx={{ cursor: 'pointer', mt: 2 }}>
                Back
              </Box>
            </Box>
          )}

          {activeStep === 2 && (
            <Box>
              Enhance Component (Coming Soon)
              <Box onClick={handleBack} sx={{ cursor: 'pointer', mt: 2 }}>
                Back
              </Box>
            </Box>
          )} */}
        </Box>
      </FormProvider>
    </AuthViewWraper>
  );
}
