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