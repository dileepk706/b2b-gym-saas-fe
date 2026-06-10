import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import { pathKeys } from 'shared/routes';

// ----------------------------------------------------------------------

export const gymRoutes: RouteObject = {
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
};
