const fs = require('fs');
const path = require('path');

const makeDir = (dir) => {
  const fullPath = path.join(__dirname, 'src', dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
};

const write = (filePath, content) => {
  const fullPath = path.join(__dirname, 'src', filePath);
  fs.writeFileSync(fullPath, content.trim(), 'utf8');
};

makeDir('widgets/role-table');
makeDir('pages/roles/list');
makeDir('pages/roles/create');
makeDir('pages/roles/update');

// widget
write('widgets/role-table/RoleTable.tsx', `
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { fDate } from '@utils/format-time';
import { Role } from 'entities/roles/roles.contract';
import { DataTable, ColumnDef } from 'shared/ui/data-table';
import Iconify from 'shared/ui/iconify';
import { RouterLink } from '@routes/components';
import { pathKeys } from 'shared/routes';
import { RoleDeleteButton } from 'features/roles/delete';
import { icons } from 'shared/ui/iconify/icons';

interface RoleTableProps {
  rows: Role[];
  isLoading?: boolean;
}

const ROLE_COLUMNS: ColumnDef<Role>[] = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 160,
    render: (row) => (
      <Typography variant="body2" fontWeight={500}>
        {row.name}
      </Typography>
    ),
  },
  {
    id: 'created_at',
    label: 'Created At',
    minWidth: 130,
    render: (row) => (
      <Typography variant="body2" color="text.secondary">
        {fDate(row.created_at)}
      </Typography>
    ),
  },
  {
    id: 'updated_at',
    label: 'Updated At',
    minWidth: 130,
    render: (row) => (
      <Typography variant="body2" color="text.secondary">
        {fDate(row.updated_at)}
      </Typography>
    ),
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 100,
    render: (row) => (
      <Box sx={{ display: 'flex', gap: 1 }}>
        <IconButton
          component={RouterLink as any}
          to={pathKeys.staff.RRoles + '/update/' + row.id}
          size="small"
          color="primary"
        >
          <Iconify icon={icons.edit} />
        </IconButton>
        <RoleDeleteButton roleId={row.id} roleName={row.name} />
      </Box>
    ),
  },
];

export function RoleTable({ rows, isLoading }: RoleTableProps) {
  return (
    <DataTable<any>
      columns={ROLE_COLUMNS}
      rows={rows}
      isLoading={isLoading}
      emptyText="No roles found"
    />
  );
}
`);

write('widgets/role-table/index.ts', `
export * from './RoleTable';
`);

// page: list
write('pages/roles/list/role-list.page.ui.tsx', `
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import { RoleTable } from 'widgets/role-table';
import { getRolesQueryOptions } from 'entities/roles/roles.api';
import { Paper } from 'shared/ui/paper';
import { FactoryButton } from 'shared/ui';
import { RouterLink } from '@routes/components';
import { pathKeys } from 'shared/routes';

export default function RoleListPage() {
  const { data, isLoading } = useQuery(getRolesQueryOptions());

  return (
    <>
      <Helmet>
        <title>Role List</title>
      </Helmet>

      <Paper>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            flexGrow: 1,
            gap: 3,
            px: 2,
            pt: 2,
            pb: 4,
          }}
        >
          <Box>
            <FactoryButton component={RouterLink} to={pathKeys.staff.RRoles + '/create'}>
              Create Role
            </FactoryButton>
          </Box>
        </Box>
        <RoleTable rows={data || []} isLoading={isLoading} />
      </Paper>
    </>
  );
}
`);

write('pages/roles/list/role-list.route.tsx', `
import { RouteObject } from 'react-router-dom';
import RoleListPage from './role-list.page.ui';

export const roleListRoute: RouteObject = {
  path: '',
  element: <RoleListPage />,
};
`);

// page: create
write('pages/roles/create/role-create.page.ui.tsx', `
import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from 'shared/ui/paper';
import { RoleCreateForm } from 'features/roles/create';
import { Breadcrumbs } from 'shared/ui/breadcrumbs';
import { pathKeys } from 'shared/routes';

export default function RoleCreatePage() {
  return (
    <>
      <Helmet>
        <title>Create Role</title>
      </Helmet>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Create a new role
        </Typography>
        <Breadcrumbs
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Staffs', href: pathKeys.staff.root },
            { name: 'Roles', href: pathKeys.staff.RRoles },
            { name: 'New Role' },
          ]}
        />
      </Box>

      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <RoleCreateForm />
      </Paper>
    </>
  );
}
`);

write('pages/roles/create/role-create.route.tsx', `
import { RouteObject } from 'react-router-dom';
import RoleCreatePage from './role-create.page.ui';

export const roleCreateRoute: RouteObject = {
  path: 'create',
  element: <RoleCreatePage />,
};
`);

// page: update
write('pages/roles/update/role-update.page.ui.tsx', `
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from 'shared/ui/paper';
import { RoleUpdateForm } from 'features/roles/update';
import { getRoleByIdQueryOptions } from 'entities/roles/roles.api';
import { Breadcrumbs } from 'shared/ui/breadcrumbs';
import { pathKeys } from 'shared/routes';
import CircularProgress from '@mui/material/CircularProgress';

export default function RoleUpdatePage() {
  const { id } = useParams<{ id: string }>();
  const { data: role, isLoading } = useQuery(getRoleByIdQueryOptions(id as string));

  if (isLoading) {
    return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  }

  if (!role) {
    return <Typography>Role not found</Typography>;
  }

  return (
    <>
      <Helmet>
        <title>Update Role</title>
      </Helmet>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Update role
        </Typography>
        <Breadcrumbs
          links={[
            { name: 'Dashboard', href: '/' },
            { name: 'Staffs', href: pathKeys.staff.root },
            { name: 'Roles', href: pathKeys.staff.RRoles },
            { name: role?.name },
          ]}
        />
      </Box>

      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <RoleUpdateForm role={role} />
      </Paper>
    </>
  );
}
`);

write('pages/roles/update/role-update.route.tsx', `
import { RouteObject } from 'react-router-dom';
import RoleUpdatePage from './role-update.page.ui';

export const roleUpdateRoute: RouteObject = {
  path: 'update/:id',
  element: <RoleUpdatePage />,
};
`);

console.log('Done creating role pages and widgets');
