import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Paper } from 'shared/ui/paper';
import { RoleUpdateForm } from 'features/roles/update';
import { getRoleByIdQueryOptions } from 'entities/roles/roles.api';
import CustomBreadcrumbs from 'shared/ui/custom-breadcrumbs';
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
        <CustomBreadcrumbs
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