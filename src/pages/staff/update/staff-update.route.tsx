import { RouteObject } from 'react-router-dom';
import { pathKeys } from 'shared/routes';
import StaffUpdatePage from './staff-update.page.ui';
import { StaffUpdateLoader } from './staff-update.loader';

export const staffUpdateRoute: RouteObject = {
  path: pathKeys.staff.update(),
  element: <StaffUpdatePage />,
  loader: StaffUpdateLoader,
};
