import { useSessionStore } from 'entities/session';
import { useGymStore } from '@stores/gym.store';
import { gymByIdQueryOptions, gymsGlobalQueryOptions } from 'entities/gym/gym.api';
import { queryClient } from 'shared/queryClient';
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { getUserProfile } from 'shared/api/api.services';
import { pathKeys } from 'shared/routes';

const isOnboardingPath = (pathname: string) =>
  pathname.replace(/\/+$/, '') === pathKeys.onboarding.replace(/\/+$/, '');

export async function LoadGyms({ request }: LoaderFunctionArgs) {
  const { accessToken, user: storedUser, setUser } = useSessionStore.getState();
  const { clearSelectedGym, setSelectedGymId } = useGymStore.getState();

  if (!accessToken) {
    clearSelectedGym();
    return null;
  }

  const pathname = new URL(request.url).pathname;
  let user = storedUser;

  if (!user) {
    const response = await getUserProfile();
    user = response.data.data.user;
    setUser(user);
  }

  if (!user?.tenant_id) {
    clearSelectedGym();
    queryClient.removeQueries({ queryKey: ['gyms'] });

    if (isOnboardingPath(pathname)) {
      return null;
    }

    return redirect(pathKeys.onboarding);
  }

  if (isOnboardingPath(pathname)) {
    return redirect(pathKeys.dashboard().root);
  }

  const gyms = await queryClient.ensureQueryData(gymsGlobalQueryOptions());
  const persistedGymId = useGymStore.getState().selectedGymId;
  const selectedGymId =
    gyms.find((gym: any) => gym.id === persistedGymId)?.id ?? gyms[0]?.id ?? null;

  setSelectedGymId(selectedGymId);

  if (selectedGymId) {
    await queryClient.ensureQueryData(gymByIdQueryOptions(selectedGymId));
  }

  return null;
}
