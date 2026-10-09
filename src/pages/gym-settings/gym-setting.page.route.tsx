import { RouteObject } from 'react-router-dom';
import { pathKeys } from 'shared/routes';

export const gymSettingPageRoute: RouteObject = {
  path: pathKeys.gym().root,
  lazy: async () => {
    const Component = await import('./gym-setting.page.ui').then((module) => module.default);
    return { Component };
  },
};
