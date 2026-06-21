import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { pathKeys } from 'shared/routes';
import { planPageRoute } from '@pages/plan/plan.page.route';
import { settingPageRoute } from '@pages/user-setting/user-setting.page.route';
import AccountLayout from '@layouts/account/account.layout';
import SplashScreenTransparent from 'shared/ui/loading/SplashScreenTransparent';

// ----------------------------------------------------------------------

export const accountRoutes: RouteObject = {
  path: pathKeys.account(true).root,
  element: (
    <AccountLayout>
      <Suspense fallback={<SplashScreenTransparent />}>
        <Outlet />
      </Suspense>
    </AccountLayout>
  ),
  children: [settingPageRoute, planPageRoute],
};
