import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import { pathKeys } from 'shared/routes';
import SettingsLayout from '@layouts/settings.layout';
import { gymSettingPageRoute } from '@pages/gym-settings/gym-setting.page.route';
import { usersettingPageRoute } from '@pages/user-setting/user-setting.page.route';

// ----------------------------------------------------------------------

export const settingsRoute: RouteObject = {
  path: pathKeys.settings.root,
  element: (
    <SettingsLayout>
      <Suspense fallback={<SplashScreen />}>
        <Outlet />
      </Suspense>
    </SettingsLayout>
  ),
  children: [gymSettingPageRoute, usersettingPageRoute],
};
