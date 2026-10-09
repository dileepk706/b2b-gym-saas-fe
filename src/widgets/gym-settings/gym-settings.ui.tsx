import {
  Box,
  Typography,
  Stack,
  Divider,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Button,
} from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { Paper } from 'shared/ui/paper';
import Iconify from 'shared/ui/iconify';
import { GeneralInformationForm, WorkingHoursForm, ChangeLogoForm } from 'features/gym-settings/ui';
import Subheading from 'shared/ui/subheading/subheading';

type SettingRow = {
  title: string;
  description: string;
  tabId: string;
};

const SETTINGS_ROWS: SettingRow[] = [
  {
    title: 'General Information',
    description: 'Location name, address, email and phone number.',
    tabId: 'general',
  },
  {
    title: 'Working Hours',
    description: 'Set Opening time, Closing time and Maximum capacity',
    tabId: 'working-hours',
  },
  {
    title: 'Change Logo',
    description: 'Your logo appears in gym Emails and on your online sign-up page.',
    tabId: 'logo',
  },
];

export default function GymSettingsWidget() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentTab = searchParams.get('tab');

  const handleBack = () => {
    searchParams.delete('tab');
    setSearchParams(searchParams);
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'general':
        return <GeneralInformationForm />;
      case 'working-hours':
        return <WorkingHoursForm />;
      case 'logo':
        return <ChangeLogoForm />;
      default:
        return (
          <Paper sx={{ p: 0, overflow: 'hidden' }}>
            {SETTINGS_ROWS.map((row, index) => (
              <Box key={row.title}>
                <ListItemButton
                  onClick={() => {
                    searchParams.set('tab', row.tabId);
                    setSearchParams(searchParams);
                  }}
                  sx={{ py: 2, px: 3 }}
                >
                  <ListItemText
                    primary={row.title}
                    primaryTypographyProps={{ variant: 'subtitle2', mb: 0.5 }}
                    secondary={row.description}
                    secondaryTypographyProps={{ variant: 'body2', color: 'text.secondary' }}
                  />
                  <ListItemIcon sx={{ minWidth: 'auto' }}>
                    <Iconify icon="eva:arrow-ios-forward-fill" />
                  </ListItemIcon>
                </ListItemButton>
                {index < SETTINGS_ROWS.length - 1 && <Divider />}
              </Box>
            ))}
          </Paper>
        );
    }
  };

  return (
    <Box sx={{ width: '100%', mx: 'auto' }}>
      <Stack spacing={4}>
        <Stack spacing={1} direction="row" alignItems="center">
          {currentTab && (
            <Button
              startIcon={<Iconify icon="eva:arrow-ios-back-fill" />}
              onClick={handleBack}
              sx={{ mr: 2 }}
            >
              Back
            </Button>
          )}
          {!currentTab && (
            <Subheading
              title="Gym Settings"
              description="Change the gym name, address, time settings and more."
            />
          )}
        </Stack>

        <Stack spacing={2}>{renderContent()}</Stack>
      </Stack>
    </Box>
  );
}
