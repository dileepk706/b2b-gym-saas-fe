import Chip from '@mui/material/Chip';
import Typography from '@mui/material/Typography';
import { Staffs } from 'entities/staff/staff.contracts';
import { DataTable, ColumnDef } from 'shared/ui/data-table';

// ----------------------------------------------------------------------

interface StaffTableProps {
  rows: Staffs[];
  isLoading?: boolean;
}

/** Formats a Date or date string to a readable locale string. */
function formatDate(value: Date | string | undefined | null): string {
  if (!value) return '—';
  try {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    }).format(new Date(value as any));
  } catch {
    return String(value);
  }
}

/** Role badge chip */
function RoleChip({ role }: { role: string }) {
  return (
    <Chip
      label={role}
      size="small"
      variant="outlined"
      color="primary"
      sx={{ fontWeight: 500, textTransform: 'capitalize', fontSize: '0.72rem' }}
    />
  );
}

const STAFF_COLUMNS: ColumnDef<Staffs>[] = [
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
    render: (row) => <RoleChip role={row.role_id} />,
  },
  {
    id: 'created_at',
    label: 'Created At',
    minWidth: 130,
    render: (row) => (
      <Typography variant="body2" color="text.secondary">
        {formatDate(row.created_at)}
      </Typography>
    ),
  },
  {
    id: 'updated_at',
    label: 'Updated At',
    minWidth: 130,
    render: (row) => (
      <Typography variant="body2" color="text.secondary">
        {formatDate(row.updated_at)}
      </Typography>
    ),
  },
];

/**
 * StaffTable widget.
 * Renders a staff list using the reusable DataTable component.
 */
export default function StaffTable({ rows, isLoading }: StaffTableProps) {
  return (
    <DataTable<Staffs>
      columns={STAFF_COLUMNS}
      rows={rows}
      isLoading={isLoading}
      emptyText="No staff members found"
    />
  );
}
