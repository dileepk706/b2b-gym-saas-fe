import { Helmet } from 'react-helmet-async';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from 'shared/ui/paper';
import { RoleCreateForm } from 'features/roles/create';
import CustomBreadcrumbs from 'shared/ui/custom-breadcrumbs';
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
        <CustomBreadcrumbs
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