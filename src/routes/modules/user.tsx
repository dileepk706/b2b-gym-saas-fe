import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import AppLayout from '@layouts/app/app.layout';
import { onboardingUserPageRoute } from '@pages/onboarding/onboarding-user.page.route';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from 'shared/ui/error-handler/error-handler.ui';
import { logError } from 'shared/ui/error-handler/error-handler.lib';
import { LoadGyms } from '@routes/loader';
import AuthGuard from '@auth/guard/AuthGuard';
import AuthLayout from '@layouts/auth/auth.layout';
import GymGuard from '@layouts/guard/GymGuard';
import { accountRoutes } from './account';
import { gymRoutes } from './gym';
// ----------------------------------------------------------------------

export const userRoutes: RouteObject = {
  path: '/',
  loader: LoadGyms,
  element: (
    <AuthGuard>
      <GymGuard>
        <AppLayout>
          <Suspense fallback={<SplashScreen loadingText="Loading you gym details" />}>
            <Outlet />
          </Suspense>
        </AppLayout>
      </GymGuard>
    </AuthGuard>
  ),

  children: [
    {
      element: <h1>Dashboard coming soon..</h1>,
      index: true,
    },
    {
      element: (
        <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      ),
      children: [gymRoutes, accountRoutes],
    },
  ],
};

export const onboardingRoutes: RouteObject = {
  loader: LoadGyms,
  element: (
    <AuthLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </AuthLayout>
  ),
  children: [onboardingUserPageRoute],
};
