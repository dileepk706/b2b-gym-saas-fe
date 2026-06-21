import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import { onboardingUserPageRoute } from '@pages/onboarding/onboarding-user.page.route';
import AuthLayout from '@layouts/auth/auth.layout';
import AppLayout from '@layouts/app/app.layout';
import { authMiddleware } from 'shared/lib/auth.middleware';
import { accountRoutes } from './account';
import { gymRoutes } from './gym';
import { workspaceMiddleware } from 'shared/lib/workspace.middleware';
import { subscriptionMiddleware } from 'shared/lib/subscription.middleware';
import { staffRoutes } from './staffs';
// ----------------------------------------------------------------------

export const userRoutes: RouteObject = {
  path: '/',
  loader: () => null,
  handle: {
    middleware: [authMiddleware, workspaceMiddleware, subscriptionMiddleware],
  },
  element: (
    <AppLayout>
      <Suspense fallback={<SplashScreen loadingText="Loading you gym details" />}>
        <Outlet />
      </Suspense>
    </AppLayout>
  ),
  children: [gymRoutes, accountRoutes, staffRoutes],
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
