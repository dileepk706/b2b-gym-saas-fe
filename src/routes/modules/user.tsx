import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import { onboardingUserPageRoute } from '@pages/onboarding/onboarding-user.page.route';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from 'shared/ui/error-handler/error-handler.ui';
import { logError } from 'shared/ui/error-handler/error-handler.lib';
import AuthLayout from '@layouts/auth/auth.layout';
import AppLayout from '@layouts/app/app.layout';
import { authMiddleware } from 'shared/lib/auth.middleware';
import { accountRoutes } from './account';
import { gymRoutes } from './gym';
import { workspaceMiddleware } from 'shared/lib/workspace.middleware';
// ----------------------------------------------------------------------

export const userRoutes: RouteObject = {
  path: '/',
  loader: () => null,
  handle: {
    middleware: [authMiddleware, workspaceMiddleware],
  },
  element: (
    <AppLayout>
      <Suspense fallback={<SplashScreen loadingText="Loading you gym details" />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  ),

  children: [
    // {
    //   element: <h1>Dashboard coming soon..</h1>,
    //   index: true,
    // },
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
  loader: () => null,
  handle: {
    middleware: [authMiddleware, workspaceMiddleware],
  },
  element: (
    <AuthLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </AuthLayout>
  ),
  children: [onboardingUserPageRoute],
};
