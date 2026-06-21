import { RouteObject } from 'react-router-dom';
import { pathKeys } from 'shared/routes';
import StaffListPage from './staff-list.page.ui';

export const staffListRoute: RouteObject = {
  element: <StaffListPage />,
  index: true,
};
