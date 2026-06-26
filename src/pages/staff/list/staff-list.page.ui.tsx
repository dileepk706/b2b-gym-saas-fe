import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useQuery } from '@tanstack/react-query';
import Box from '@mui/material/Box';
import { SearchBar } from 'shared/ui/search-bar';
import { DateFilterDropdown, DateFilterValue } from 'shared/ui/date-filter-dropdown';
import { StaffTable } from 'widgets/staff-table';
import { searchStaffQueryOptions } from 'entities/staff/staff.api';
import { Paper } from 'shared/ui/paper';
import { FactoryButton } from 'shared/ui';
import { RouterLink } from '@routes/components';
import { pathKeys } from 'shared/routes';

// ----------------------------------------------------------------------

export default function StaffListPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilterValue>({ option: 'any' });

  const { data, isLoading } = useQuery(searchStaffQueryOptions({ query: searchQuery }));

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
            <FactoryButton component={RouterLink} to={pathKeys.staff.RCreate}>
              Create
            </FactoryButton>
          </Box>
        </Box>
        <StaffTable rows={data?.data.staffs as any} isLoading={isLoading} />
      </Paper>
    </>
  );
}
