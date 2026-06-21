import { RouteObject } from 'react-router-dom';
import { pathKeys } from 'shared/routes';

export const settingPageRoute: RouteObject = {
  path: pathKeys.account().setting,
  lazy: async () => {
    const Component = await import('./user-setting.page.ui').then((module) => module.default);
    return { Component };
  },
};
