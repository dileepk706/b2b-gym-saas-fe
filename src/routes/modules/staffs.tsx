import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import { pathKeys } from 'shared/routes';
import AccountLayout from '@layouts/account/account.layout';

// ----------------------------------------------------------------------

export const staffRoutes: RouteObject = {
  path: pathKeys.staff.root,
  element: (
    <AccountLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </AccountLayout>
  ),
  children: [],
};
