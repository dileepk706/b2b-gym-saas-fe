import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from '@components/loading-screen';
import AuthGuard from '@auth/guard/AuthGuard';
import GymGuard from '@layouts/guard/GymGuard';
import AppLayout from '@layouts/app/AppLayout';
import { pathKeys } from 'shared/routes';
import AuthLayout from '@layouts/auth/classic';
import { onboardingUserPageRoute } from '@pages/onboarding/onboarding-user.page.route';
import { ErrorBoundary } from 'react-error-boundary';
import { ErrorHandler } from '@components/error-handler/error-handler.ui';
import { logError } from '@components/error-handler/error-handler.lib';
import { LoadGyms } from '@routes/loader';
// ----------------------------------------------------------------------

export const userRoutes: RouteObject = {
  path: '/',
  loader: LoadGyms,
  element: (
    <AuthGuard>
      <GymGuard>
        <AppLayout>
          {/* <PaymentGuard> */}
          <Suspense fallback={<SplashScreen loadingText="Loading you gym details" />}>
            <Outlet />
          </Suspense>
          {/* </PaymentGuard> */}
        </AppLayout>
      </GymGuard>
    </AuthGuard>
  ),

  children: [
    {
      element: (
        <ErrorBoundary FallbackComponent={ErrorHandler} onError={logError}>
          <Suspense fallback={<SplashScreen />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      ),
      children: [
        // gym tab

        {
          path: pathKeys.gym(true).root,
          element: (
            // <GymLayout>
            <Suspense fallback={<SplashScreen />}>
              <Outlet />
            </Suspense>
            // </GymLayout>
          ),
          children: [
            {
              path: pathKeys.gym().schedule,
              element: <h1>Schedule</h1>,
            },
            {
              path: pathKeys.gym().staffs,
              element: <h1>Staffs</h1>,
            },
          ],
        },
      ],
    },
  ],
};

export const onboardingRoutes: RouteObject = {
  element: (
    <AuthGuard>
      <AuthLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </AuthLayout>
    </AuthGuard>
  ),
  children: [onboardingUserPageRoute],
};
