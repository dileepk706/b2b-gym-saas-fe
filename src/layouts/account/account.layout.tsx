import Box from '@mui/material/Box';
import { useNavigation } from 'react-router-dom';
import { SplashScreen } from 'shared/ui/loading';
import Header from './header';
import { Stack } from '@mui/material';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AccountLayout({ children }: Props) {
  const navigation = useNavigation();
  const isRouteLoading = navigation.state === 'loading';

  return (
    <Stack spacing={0}>
      <Header />
      <Box component="section" sx={{ minHeight: 'calc(100vh - 80px)', position: 'relative' }}>
        {isRouteLoading ? (
          <SplashScreen
            loadingText="Loading page..."
            sx={{
              position: 'relative',
              right: 'auto',
              bottom: 'auto',
              minHeight: 'calc(100vh - 80px)',
              height: 'auto',
              zIndex: 1,
              bgcolor: 'transparent',
            }}
          />
        ) : (
          <Box sx={{ p: { xs: 1.5, md: 2 } }}>
            {children}
          </Box>
        )}
      </Box>
    </Stack>
  );
  // <Box sx={{ minHeight: 1, bgcolor: 'grey.100' }}>
  //   <Header />

  //   <Box
  //     sx={{
  //       p: {
  //         xs: 2,
  //         md: 3,
  //       },
  //     }}
  //   >
  //     {children}
  //   </Box>
  // </Box>
}
