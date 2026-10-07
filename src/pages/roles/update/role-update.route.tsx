import { RouteObject } from 'react-router-dom';
import RoleUpdatePage from './role-update.page.ui';

export const roleUpdateRoute: RouteObject = {
  path: 'update/:id',
  element: <RoleUpdatePage />,
};