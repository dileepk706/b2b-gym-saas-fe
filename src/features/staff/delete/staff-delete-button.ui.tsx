import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Iconify from 'shared/ui/iconify';
import ConfirmDialog from 'shared/ui/custom-dialog/ConfirmDialog';
import Button from '@mui/material/Button';
import { useDeleteStaffMutation } from './staff.delete.mutation';
import { icons } from 'shared/ui/iconify/icons';

export interface StaffDeleteButtonProps {
  staffId: string;
  staffName: string;
}

export function StaffDeleteButton({ staffId, staffName }: StaffDeleteButtonProps) {
  const [open, setOpen] = useState(false);
  const mutation = useDeleteStaffMutation({
    onSuccess: () => {
      setOpen(false);
    },
  });

  const handleDelete = () => {
    mutation.mutate(staffId);
  };

  return (
    <>
      <IconButton size="small" color="error" onClick={() => setOpen(true)}>
        <Iconify icon={icons.delete} />
      </IconButton>

      <ConfirmDialog
        open={open}
        onClose={() => setOpen(false)}
        title="Delete Staff"
        content={`Are you sure you want to delete ${staffName}? This action cannot be undone.`}
        action={
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Deleting...' : 'Delete'}
          </Button>
        }
      />
    </>
  );
}
