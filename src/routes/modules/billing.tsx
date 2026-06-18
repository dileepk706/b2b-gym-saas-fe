import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import { billingRoute } from '@pages/billing/billing.page.route';
import AuthLayout from '@layouts/auth/auth.layout';
import { authMiddleware } from 'shared/lib/auth.middleware';
import { workspaceMiddleware } from 'shared/lib/workspace.middleware';
import { subscriptionMiddleware } from 'shared/lib/subscription.middleware';
import AppMain from '@layouts/app/app.main';

export const billingRoutes: RouteObject = {
  loader: () => null,
  handle: {
    middleware: [authMiddleware, workspaceMiddleware, subscriptionMiddleware],
  },
  element: (
    <AppMain>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </AppMain>
  ),
  children: [billingRoute],
};
