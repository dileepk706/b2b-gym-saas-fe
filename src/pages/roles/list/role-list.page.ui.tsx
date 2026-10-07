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
            <FactoryButton component={RouterLink as any} to={pathKeys.staff.RRoles + '/create'}>
              Create Role
            </FactoryButton>
          </Box>
        </Box>
        <RoleTable rows={data || []} isLoading={isLoading} />
      </Paper>
    </>
  );
}