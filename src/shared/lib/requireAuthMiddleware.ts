import { useSessionStore } from 'entities/session';
import { redirect, type LoaderFunctionArgs } from 'react-router-dom';
import { getUserProfile } from 'shared/api/api.services';
import { pathKeys } from 'shared/routes';

export async function requireAuthMiddleware({ request }: LoaderFunctionArgs) {
  const { accessToken, user, setUser, clearSession } = useSessionStore.getState();

  if (!accessToken) {
    const url = new URL(request.url);
    const returnTo = url.pathname + url.search;
    const searchParams = new URLSearchParams({ returnTo }).toString();
    return redirect(`${pathKeys.auth.userLogin}?${searchParams}`);
  }

  if (!user) {
    try {
      const response = await getUserProfile();
      const refreshedUser = response.data.data.user;
      setUser(refreshedUser);
    } catch (error) {
      console.error('Failed to fetch user profile in requireAuthLoader:', error);
      clearSession();
      const url = new URL(request.url);
      const returnTo = url.pathname + url.search;
      const searchParams = new URLSearchParams({ returnTo }).toString();
      return redirect(`${pathKeys.auth.userLogin}?${searchParams}`);
    }
  }

  return null;
}
