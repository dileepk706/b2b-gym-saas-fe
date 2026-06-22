import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { SearchBar } from 'shared/ui/search-bar';
import { DateFilterDropdown, DateFilterValue } from 'shared/ui/date-filter-dropdown';
import { StaffTable } from 'widgets/staff-table';
import { searchStaffQueryOptions } from 'entities/staff/staff.api';
import { Staffs } from 'entities/staff/staff.contracts';
import { Paper } from 'shared/ui/paper';
import { FactoryButton } from 'shared/ui';
import { RouterLink } from '@routes/components';

// ----------------------------------------------------------------------

/** Returns true if the staff row passes the date filter. */
function applyDateFilter(row: Staffs, filter: DateFilterValue): boolean {
  if (filter.option === 'any') return true;

  const updatedAt = row.updated_at ? new Date(row.updated_at as any) : null;
  if (!updatedAt) return true;

  const now = new Date();

  if (filter.option === 'last_7_days') {
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - 7);
    return updatedAt < cutoff;
  }
  if (filter.option === 'last_30_days') {
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - 30);
    return updatedAt < cutoff;
  }
  if (filter.option === 'last_90_days') {
    const cutoff = new Date(now);
    cutoff.setDate(cutoff.getDate() - 90);
    return updatedAt < cutoff;
  }
  if (filter.option === 'before_date' && filter.date) {
    const cutoff = new Date(filter.date);
    return updatedAt < cutoff;
  }

  return true;
}

// ----------------------------------------------------------------------

export default function StaffListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilterValue>({ option: 'any' });

  const { data, isLoading } = useQuery(searchStaffQueryOptions({ query: searchQuery }));

  /** Client-side date filter on top of the server search */
  const filteredRows = useMemo(() => {
    return [
      {
        name: 'John Doe',
        email: 'sdkfjhdskf@gmail.com',
        role_id: 'admin',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ];
    const rows = data ?? [];
    return rows.filter((row) => applyDateFilter(row, dateFilter));
  }, [data, dateFilter]);

  console.log(data);

  return (
    <>
      <Helmet>
        <title>Staff List</title>
      </Helmet>

      <Paper
        sx={
          {
            // px: 2,
            // py: 1.5,
            // display: 'flex',
            // alignItems: 'flex-end',
            // gap: 2,
            // flexWrap: 'wrap',
          }
        }
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            flexGrow: 1,
            gap: 3,
            px: 2,
            pt: 2,
            pb: 4,
          }}
        >
          <Box sx={{ flex: '1 1 240px' }}>
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search staff…"
              debounceMs={500}
              sx={{ width: '100%' }}
            />
          </Box>

          <DateFilterDropdown label="Updated" value={dateFilter} onChange={setDateFilter} />
          <Box>
            <FactoryButton component={RouterLink} to="sdfdsf">
              Create
            </FactoryButton>
          </Box>
        </Box>
        <StaffTable rows={data?.data.staffs as any} isLoading={isLoading} />
      </Paper>
    </>
  );
}
