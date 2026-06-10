import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { alpha } from '@mui/material/styles';
// routes
import { RouterLink } from '@routes/components';
import { pathKeys } from 'shared/routes';
// components
import Iconify from 'shared/ui/iconify';

// ----------------------------------------------------------------------

const ACCOUNT_TABS = [
  {
    label: 'Settings',
    path: pathKeys.account(true).setting,
  },
  {
    label: 'Account Plan',
    path: pathKeys.account(true).plan,
  },
];

const normalizePath = (path: string) => path.replace(/\/+$/, '');

export default function Header() {
  const { pathname } = useLocation();

  const currentTab = useMemo(() => {
    const currentPath = normalizePath(pathname);
    const activeTab = ACCOUNT_TABS.find((tab) => currentPath === normalizePath(tab.path));

    return activeTab ? normalizePath(activeTab.path) : false;
  }, [pathname]);

  return (
    <Box
      component="header"
      sx={{
        bgcolor: 'background.paper',
        borderBottom: (theme) => `1px solid ${alpha(theme.palette.grey[500], 0.12)}`,
        boxShadow: (theme) => `0 8px 18px 0 ${alpha(theme.palette.grey[500], 0.08)}`,
        width: '100%',
      }}
    >
      <Box
        sx={{
          px: { xs: 2, md: 3 },
          pt: { xs: 2, md: 2.5 },
        }}
      >
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ mb: 1.5 }}>
          <Box
            sx={{
              position: 'relative',
              width: 40,
              height: 40,
              color: 'primary.main',
              flexShrink: 0,
            }}
          >
            <Iconify
              icon="solar:user-bold"
              width={30}
              sx={{
                position: 'absolute',
                left: 0,
                bottom: 0,
              }}
            />
            <Iconify
              icon="solar:user-bold"
              width={22}
              sx={{
                position: 'absolute',
                right: 0,
                bottom: 1,
                color: 'primary.light',
              }}
            />
          </Box>

          <Typography variant="h3" sx={{ fontWeight: 400, lineHeight: 1.1 }}>
            Account
          </Typography>
        </Stack>

        <Tabs
          value={currentTab}
          variant="scrollable"
          scrollButtons={false}
          aria-label="Account section tabs"
          sx={{
            minHeight: 38,
            '.MuiTabs-indicator': {
              height: 2,
              bgcolor: 'primary.main',
            },
            '.MuiTab-root': {
              minHeight: 38,
              px: { xs: 2, md: 3 },
              py: 0,
              color: 'text.primary',
              fontSize: 15,
              fontWeight: 400,
              textTransform: 'none',
              whiteSpace: 'nowrap',
              '&.Mui-selected': {
                color: 'primary.main',
              },
            },
          }}
        >
          {ACCOUNT_TABS.map((tab) => (
            <Tab
              key={tab.path}
              label={tab.label}
              value={normalizePath(tab.path)}
              component={RouterLink}
              href={tab.path}
            />
          ))}
        </Tabs>
      </Box>
    </Box>
  );
}
