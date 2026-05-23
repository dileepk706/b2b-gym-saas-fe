import { useEffect, useCallback, useState } from 'react';
import { pathKeys } from 'shared/routes';
import { useRouter } from '@routes/hook';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
import { useSessionStore } from 'entities/session';
import { SplashScreen } from '@components/loading-screen';
import { Button } from 'shared/ui';
import { useAuthContext } from '../hooks';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function AuthGuard({ children }: Props) {
  const router = useRouter();
  const { authenticated, loading } = useAuthContext();
  const [checked, setChecked] = useState(false);
  const sessionExpired = useSessionStore((state) => state.sessionExpired);

  const check = useCallback(() => {
    if (loading) {
      return;
    }

    if (!authenticated) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname + window.location.search,
      }).toString();

      const href = `${pathKeys.auth.userLogin}?${searchParams}`;
      router.replace(href);
    } else {
      setChecked(true);
    }
  }, [authenticated, loading, router]);

  useEffect(() => {
    check();
  }, [check]);

  if (loading || !checked) {
    return <SplashScreen loadingText="Authenticating..." />;
  }

  if (sessionExpired) {
    return <RefreshError />;
  }

  return <>{children}</>;
}

const RefreshError = () => (
  <Dialog open maxWidth="xs">
    <DialogTitle sx={{ color: 'error.main', fontWeight: 700 }}>Session Expired</DialogTitle>
    <DialogContent sx={{ mt: 1 }}>
      <Typography variant="body1">
        Your session has expired or the refresh token is no longer valid. Please login again to
        continue.
      </Typography>
    </DialogContent>
    <DialogActions sx={{ px: 3, pb: 3 }}>
      <Button fullWidth sx={{ fontWeight: 700, py: 1 }}>
        Go to Login
      </Button>
    </DialogActions>
  </Dialog>
);
