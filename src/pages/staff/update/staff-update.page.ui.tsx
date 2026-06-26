import { useParams } from 'react-router-dom';
import StaffUpdateForm from 'features/staff/update/staff.update-form.ui';
import { Helmet } from 'react-helmet-async';
import { Box, CircularProgress } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getStaffByIdQueryOptions } from 'entities/staff/staff.api';

export default function StaffUpdatePage() {
  const params = useParams();
  const staffId = params.id as string;
  const { data: staff, isLoading } = useQuery(getStaffByIdQueryOptions(staffId));

  if (isLoading || !staff) {
    return <CircularProgress sx={{ m: 4 }} />;
  }

  return (
    <>
      <Helmet>
        <title>Update staff : {staff.name}</title>
      </Helmet>
      <Box sx={{ maxWidth: 560 }}>
        <StaffUpdateForm key={staff.id} currentStaff={staff} />
      </Box>
    </>
  );
}
