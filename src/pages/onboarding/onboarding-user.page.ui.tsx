import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import { logError } from 'shared/ui/error-handler/error-handler.lib';
import { ErrorHandler } from 'shared/ui/error-handler/error-handler.ui';
import { SplashScreen } from 'shared/ui/loading-screen';
import { OnboardingFormWidget } from 'widgets/onboarding-form';

export default function OnboardingUserPage() {
  return (
    <>
      <Helmet>
        <title>Onboarding</title>
      </Helmet>
      <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
        <Suspense fallback={<SplashScreen />}>
          <OnboardingFormWidget />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
