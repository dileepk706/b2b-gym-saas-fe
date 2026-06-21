import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import { pathKeys } from 'shared/routes';
import StaffLayout from '@layouts/staff/staff.layout';
import { staffListRoute } from '@pages/staff/list/staff-list.route';

// ----------------------------------------------------------------------

export const staffRoutes: RouteObject = {
  path: pathKeys.staff.root,
  element: (
    <StaffLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </StaffLayout>
  ),
  children: [staffListRoute],
};
