import { useEffect, useState } from 'react';
import { useRouter } from '@routes/hook';
import { pathKeys } from 'shared/routes';
import { SplashScreen } from 'shared/ui/loading';
import { useAuthContext } from '../../auth/hooks';

type Props = {
  children: React.ReactNode;
};

export default function GymGuard({ children }: Props) {
  const router = useRouter();
  const { authenticated, user, loading } = useAuthContext();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (loading) return;

    if (authenticated) {
      const isGymCreatePage = window.location.pathname.includes(pathKeys.onboarding);

      if (!user?.tenant_id && !isGymCreatePage) {
        router.replace(pathKeys.onboarding);
      } else if (user?.tenant_id && isGymCreatePage) {
        router.replace(pathKeys.dashboard().root);
      } else {
        setChecked(true);
      }
    }
  }, [authenticated, user, loading, router]);

  if (loading || !checked) {
    return <SplashScreen loadingText="Retrieving your workspace data..." />;
  }

  return <>{children}</>;
}

// check sp have gymurl
// if exist call gym details with gymurl and store in redux
// call the gym list api
