import { redirect, RouteObject } from 'react-router-dom';
import { pathKeys } from 'shared/routes';
import { PlanLoader } from './plan.loader';

export const planPageRoute: RouteObject = {
  path: pathKeys.account().plan,
  loader: PlanLoader,
  handle: {
    middleware: [
      () => {
        let o = 'dileep';
        let b = 'dilesep';
        // if (o === b) {
        //   return redirect('/');
        // }
        return null;
      },
    ],
  },
  lazy: async () => {
    const Component = await import('./plan.page.ui').then((module) => module.default);
    return { Component };
  },
};
