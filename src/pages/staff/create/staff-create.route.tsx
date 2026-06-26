import { RouteObject } from 'react-router-dom';
import { pathKeys } from 'shared/routes';
import StaffCreatePage from './staff-create.page.ui';
import { StaffCreateLoader } from './staff-create.loader';

export const staffCreateRoute: RouteObject = {
  path: pathKeys.staff.create,
  loader: StaffCreateLoader,
  element: <StaffCreatePage />,
};
