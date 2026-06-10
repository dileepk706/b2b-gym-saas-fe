import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { Helmet } from 'react-helmet-async';
import { logError } from 'shared/ui/error-handler/error-handler.lib';
import { ErrorHandler } from 'shared/ui/error-handler/error-handler.ui';
import { SplashScreen } from 'shared/ui/loading';
import { RegisterFormWidget } from 'widgets/register-form';

export default function UserRegisterPage() {
  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
        <Suspense fallback={<SplashScreen />}>
          <RegisterFormWidget />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
