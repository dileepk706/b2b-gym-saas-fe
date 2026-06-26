import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { formatCamelCase } from '@utils/format-text';
import { fDate } from '@utils/format-time';
import { Staffs } from 'entities/staff/staff.contracts';
import { StaffSearchResponse } from 'shared/api/api.types';
import { DataTable, ColumnDef } from 'shared/ui/data-table';
import Iconify from 'shared/ui/iconify';
import { RouterLink } from '@routes/components';
import { pathKeys } from 'shared/routes';
import { StaffDeleteButton } from 'features/staff/delete';
import { icons } from 'shared/ui/iconify/icons';

// ----------------------------------------------------------------------

interface StaffTableProps {
  rows: StaffSearchResponse['data']['staffs'];
  isLoading?: boolean;
}

const STAFF_COLUMNS: ColumnDef<Staffs & { roleData: any }>[] = [
  {
    id: 'name',
    label: 'Name',
    minWidth: 160,
    render: (row) => (
      <Typography variant="body2" fontWeight={500}>
        {formatCamelCase(row.name)}
      </Typography>
    ),
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 200,
    render: (row) => (
      <Typography variant="body2" color="text.secondary">
        {row.email}
      </Typography>
    ),
  },
  {
    id: 'phone',
    label: 'Phone',
    minWidth: 140,
    render: (row) => (
      <Typography variant="body2" color="text.secondary">
        {row.phone || '—'}
      </Typography>
    ),
  },
  {
    id: 'role_id',
    label: 'Role',
    minWidth: 120,
    render: (row) => (
      <Chip
        label={row.roleData.name}
        size="small"
        variant="outlined"
        color="primary"
        sx={{ fontWeight: 500, textTransform: 'capitalize', fontSize: '0.72rem' }}
      />
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
          to={pathKeys.staff.update(row.id)}
          size="small"
          color="primary"
        >
          <Iconify icon={icons.edit} />
        </IconButton>
        <StaffDeleteButton staffId={row.id} staffName={row.name} />
      </Box>
    ),
  },
];

export default function StaffTable({ rows, isLoading }: StaffTableProps) {
  return (
    <DataTable<any>
      columns={STAFF_COLUMNS}
      rows={rows}
      isLoading={isLoading}
      emptyText="No staff members found"
    />
  );
}
