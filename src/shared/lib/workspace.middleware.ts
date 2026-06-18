import { useSessionStore } from 'entities/session';
import { useCurrentGymStore, useGymStore } from 'entities/gym/gym.store';
import {
  userGymsQueryOptions,
  gymByIdQueryOptions,
  gymsGlobalQueryOptions,
} from 'entities/gym/gym.api';
import { queryClient } from 'shared/queryClient';
import { redirect } from 'react-router-dom';
import { pathKeys } from 'shared/routes';
import { getTenant } from 'shared/api/api.services';
import { currentTenantQueryOptions } from 'entities/tenant/tenant.api';
import { useTenantStore } from 'entities/tenant/tenant.store';

const isOnboardingPath = (pathname: string) =>
  pathname.replace(/\/+$/, '') === pathKeys.onboarding.replace(/\/+$/, '');

type MiddlewareArgs = {
  request: Request;
};

function waitForSessionReady(signal: AbortSignal) {
  const { loading } = useSessionStore.getState();

  if (!loading) {
    return Promise.resolve();
  }

  return new Promise<void>((resolve, reject) => {
    const unsubscribe = useSessionStore.subscribe((state) => {
      if (!state.loading) {
        unsubscribe();
        signal.removeEventListener('abort', onAbort);
        resolve();
      }
    });

    const onAbort = () => {
      unsubscribe();
      reject(signal.reason ?? new DOMException('Navigation aborted', 'AbortError'));
    };

    if (signal.aborted) {
      onAbort();
      return;
    }

    signal.addEventListener('abort', onAbort, { once: true });
  });
}

export async function workspaceMiddleware({ request }: MiddlewareArgs) {
  await waitForSessionReady(request.signal);

  const { user: storedUser } = useSessionStore.getState();
  const { clearSelectedGym, setSelectedGymId } = useGymStore.getState();
  const { setCurrentTenant } = useTenantStore.getState();
  const { setCurrentGym, clearCurrentGym } = useCurrentGymStore.getState();

  const pathname = new URL(request.url).pathname;
  let user = storedUser;

  if (!user) {
    return null;
  }

  if (!user?.tenant_id) {
    clearSelectedGym();
    clearCurrentGym();
    queryClient.removeQueries({ queryKey: ['gyms'] });

    if (isOnboardingPath(pathname)) {
      return null;
    }

    return redirect(pathKeys.onboarding);
  }

  if (isOnboardingPath(pathname)) {
    return redirect(pathKeys.dashboard().root);
  }

  const tenant = await queryClient.ensureQueryData(currentTenantQueryOptions(user.tenant_id));
  setCurrentTenant(tenant);

  const userGyms = await queryClient.ensureQueryData(userGymsQueryOptions(user.tenant_id, user.id));
  await queryClient.ensureQueryData(gymsGlobalQueryOptions());

  const persistedGymId = useGymStore.getState().selectedGymId;
  const selectedGymId =
    userGyms.find((gym) => gym.id === persistedGymId)?.id ?? userGyms[0]?.id ?? null;

  setSelectedGymId(selectedGymId);

  if (selectedGymId) {
    await queryClient.ensureQueryData(gymByIdQueryOptions(selectedGymId));
    setCurrentGym(queryClient.getQueryData(['gym', selectedGymId]) ?? null);
  }

  return null;
}

export { workspaceMiddleware as LoadGyms };
