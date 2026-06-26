import { useLoaderData } from 'react-router-dom';
import StaffUpdateForm from 'features/staff/update/staff.update-form.ui';
import { StaffUpdateLoader } from './staff-update.loader';
import { Helmet } from 'react-helmet-async';

export default function StaffUpdatePage() {
  const { staff } = useLoaderData() as Awaited<ReturnType<typeof StaffUpdateLoader>>;

  return (
    <>
      <Helmet>
        <title>Update staff {staff.name}</title>
      </Helmet>
      <StaffUpdateForm currentStaff={staff} />
    </>
  );
}
