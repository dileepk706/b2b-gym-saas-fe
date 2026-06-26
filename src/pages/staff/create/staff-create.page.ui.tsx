import { Helmet } from 'react-helmet-async';
import { Box, Typography } from '@mui/material';
import { StaffCreateForm } from 'features/staff/create';
import { useLoaderData } from 'react-router';
import { type PlanPageLoaderData } from 'pages/staff/create/staff-create.loader';
// ----------------------------------------------------------------------

export default function StaffCreatePage() {
  const { staffRoles } = useLoaderData() as PlanPageLoaderData;

  return (
    <>
      <Helmet>
        <title>Create Staff</title>
      </Helmet>

      <Box sx={{ maxWidth: 560 }}>
        <StaffCreateForm />
      </Box>
    </>
  );
}
