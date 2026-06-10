import { useCallback } from 'react';
// @mui
import { m } from 'framer-motion';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
// components
import Iconify from 'shared/ui/iconify';
import CustomPopover, { usePopover } from 'shared/ui/custom-popover';
import { useQueryClient } from '@tanstack/react-query';
import { gymByIdQueryOptions } from 'entities/gym/gym.api';
import { Gym } from 'entities/gym/gym.type';
import { useGymStore } from '@stores/gym.store';
import { varHover } from 'shared/ui/animate';

// ----------------------------------------------------------------------

type Props = {
  mini?: boolean;
};

export default function GymSelect({ mini }: Props) {
  const popover = usePopover();
  const queryClient = useQueryClient();

  const selectedGymId = useGymStore((state) => state.selectedGymId);
  const setSelectedGymId = useGymStore((state) => state.setSelectedGymId);

  const gyms = queryClient.getQueryData<Gym[]>(['gyms']) ?? [];
  const selectedGym =
    (selectedGymId ? queryClient.getQueryData<Gym>(['gym', selectedGymId]) : null) ??
    gyms.find((g) => g.id === selectedGymId) ??
    gyms[0];

  const handleSelectGym = useCallback(
    async (gymId: string) => {
      await queryClient.ensureQueryData(gymByIdQueryOptions(gymId));
      setSelectedGymId(gymId);
      await queryClient.invalidateQueries({
        predicate: (query) => {
          const [scope] = query.queryKey;
          return scope !== 'gyms' && scope !== 'gym';
        },
      });
      popover.onClose();
    },
    [popover, queryClient, setSelectedGymId]
  );

  const renderContent = mini ? (
    <ButtonBase
      onClick={popover.onOpen}
      sx={{
        width: 40,
        height: 40,
        borderRadius: 1,
        border: (theme) => `solid 1px ${alpha(theme.palette.secondary.main, 0.1)}`,
        bgcolor: alpha('#ffffff', 0.05),
        ...(popover.open && {
          bgcolor: alpha('#ffffff', 0.12),
        }),
      }}
    >
      <Avatar
        src={selectedGym?.logo_url || ''}
        alt={selectedGym?.name}
        sx={{
          width: 32,
          height: 32,
          bgcolor: 'transparent',
          color: 'secondary.main',
        }}
      >
        <Iconify icon="solar:dumbbell-outline" width={24} />
      </Avatar>
    </ButtonBase>
  ) : (
    <ButtonBase
      component={m.button}
      whileTap="tap"
      whileHover="hover"
      variants={varHover(0.98)}
      onClick={popover.onOpen}
      sx={{
        px: 1.5,
        py: 1,
        width: '100%',
        borderRadius: 1,
        textAlign: 'left',
        justifyContent: 'flex-start',
        border: (theme) => `solid 1px ${alpha(theme.palette.divider, 0.1)}`,
        bgcolor: alpha('#ffffff', 0.03),
        ...(popover.open && {
          bgcolor: alpha('#ffffff', 0.08),
        }),
      }}
    >
      <Avatar
        src={selectedGym?.logo_url || ''}
        alt={selectedGym?.name}
        sx={{
          width: 36,
          height: 36,
          bgcolor: alpha('#ffffff', 0.08),
          color: 'secondary.main',
          border: (theme) => `solid 1px ${alpha(theme.palette.secondary.main, 0.2)}`,
        }}
      >
        <Iconify icon="solar:dumbbell-outline" width={24} />
      </Avatar>

      <Stack sx={{ ml: 1.5, flexGrow: 1, overflow: 'hidden' }}>
        <Typography variant="subtitle2" noWrap sx={{ color: 'common.white', fontWeight: 700 }}>
          {selectedGym?.name}
        </Typography>
        <Typography variant="caption" noWrap sx={{ color: 'grey.500' }}>
          {selectedGym?.city}
        </Typography>
      </Stack>

      <Iconify
        icon={popover.open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
        width={16}
        sx={{ color: 'grey.600', ml: 1 }}
      />
    </ButtonBase>
  );

  return (
    <>
      {renderContent}

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 220, p: 0 }}>
        <Box sx={{ p: 1 }}>
          <Typography
            variant="overline"
            sx={{ px: 1, py: 0.5, color: 'text.disabled', display: 'block' }}
          >
            Switch Branch
          </Typography>
          {gyms.map((option) => (
            <MenuItem
              key={option.id}
              selected={option.id === selectedGym?.id}
              onClick={() => handleSelectGym(option.id)}
              sx={{ borderRadius: 0.75, my: 0.5 }}
            >
              <Avatar
                src={option.logo_url || ''}
                sx={{
                  width: 28,
                  height: 28,
                  mr: 1.5,
                  bgcolor: 'action.hover',
                  color: 'primary.main',
                }}
              >
                <Iconify icon="solar:dumbbell-outline" width={18} />
              </Avatar>
              <Stack>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  {option.name}
                </Typography>
                <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                  {option.city}
                </Typography>
              </Stack>
            </MenuItem>
          ))}
        </Box>
      </CustomPopover>
    </>
  );
}
