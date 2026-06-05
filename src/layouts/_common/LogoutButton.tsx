import { useState } from 'react';
import { alpha } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Tooltip from '@mui/material/Tooltip';
import { useAuthContext } from '@auth/hooks';
import { useRouter } from '@routes/hook';
import { pathKeys } from 'shared/routes';
import Iconify from 'shared/ui/iconify';

type Props = {
  mini?: boolean;
};

export default function LogoutButton({ mini = false }: Props) {
  const router = useRouter();
  const { logout } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    if (loading) return;

    setLoading(true);
    await logout();
    router.replace(pathKeys.login);
  };

  const content = (
    <ListItemButton
      onClick={handleLogout}
      disabled={loading}
      sx={{
        mx: mini ? 1 : 2,
        mt: 0.5,
        px: mini ? 0 : 1.5,
        py: mini ? 1.25 : 1,
        minHeight: mini ? 54 : 40,
        borderRadius: 1,
        color: 'grey.500',
        justifyContent: mini ? 'center' : 'flex-start',
        '&:hover': {
          color: 'common.white',
          bgcolor: alpha('#ffffff', 0.08),
        },
        '&.Mui-disabled': {
          color: 'grey.600',
        },
      }}
    >
      <ListItemIcon
        sx={{
          width: 24,
          height: 24,
          minWidth: mini ? 0 : 32,
          color: 'secondary.main',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <CircularProgress size={18} color="inherit" />
        ) : (
          <Iconify icon="solar:logout-3-outline" />
        )}
      </ListItemIcon>

      {!mini && (
        <ListItemText
          primary="Logout"
          primaryTypographyProps={{
            noWrap: true,
            typography: 'caption',
            textTransform: 'capitalize',
            fontWeight: 'fontWeightMedium',
          }}
        />
      )}
    </ListItemButton>
  );

  if (mini) {
    return (
      <Tooltip title="Logout" placement="right">
        {content}
      </Tooltip>
    );
  }

  return content;
}
