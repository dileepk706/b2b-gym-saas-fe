import { ErrorBoundary } from 'react-error-boundary';
import { logError } from '@components/error-handler/error-handler.lib';
import { ErrorHandler } from '@components/error-handler/error-handler.ui';
import { AuthFormWidget } from 'widgets/auth-form';

export default function LoginUserView() {
  return (
    <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
      <AuthFormWidget />
    </ErrorBoundary>
  );
}
