import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import { pathKeys } from 'shared/routes';
import AccountLayout from '@layouts/account/account.layout';
import { planPageRoute } from '@pages/plan/plan.page.route';

// ----------------------------------------------------------------------

export const accountRoutes: RouteObject = {
  path: pathKeys.account(true).root,
  element: (
    <AccountLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </AccountLayout>
  ),
  children: [
    {
      path: pathKeys.account().setting,
      element: <h1>setting/update page</h1>,
    },
    planPageRoute,
  ],
};
