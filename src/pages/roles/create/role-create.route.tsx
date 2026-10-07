import { RouteObject } from 'react-router-dom';
import RoleCreatePage from './role-create.page.ui';

export const roleCreateRoute: RouteObject = {
  path: 'create',
  element: <RoleCreatePage />,
};