import Box from '@mui/material/Box';
import Header from './header';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AccountLayout({ children }: Props) {
  return (
    <Box sx={{ minHeight: 1, bgcolor: 'grey.100' }}>
      <Header />

      <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
    </Box>
  );
}
