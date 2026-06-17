import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';
import { pathKeys } from 'shared/routes';
import { BillingLoader } from './billing.loader';

const BillingPage = lazy(() => import('./billing.page.ui'));

export const billingRoute: RouteObject = {
  path: pathKeys.billing,
  element: <BillingPage />,
  loader: BillingLoader,
};
