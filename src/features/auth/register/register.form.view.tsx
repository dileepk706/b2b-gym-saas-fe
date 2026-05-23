import { ErrorBoundary } from 'react-error-boundary';
import { logError } from '@components/error-handler/error-handler.lib';
import { ErrorHandler } from '@components/error-handler/error-handler.ui';
import { RegisterFormWidget } from 'widgets/register-form';

export default function RegisterFormView() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
      <RegisterFormWidget />
    </ErrorBoundary>
  );
}
