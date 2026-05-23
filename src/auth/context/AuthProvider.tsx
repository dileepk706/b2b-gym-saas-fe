import { useEffect, useCallback, useMemo } from 'react';
// auth utils
import { getUserProfile, loginUser, logoutUser, registerUser } from 'shared/api/api.services';
import { LoginUserDto, RegisterUserDto } from 'shared/api/api.types';
import { User, useSessionStore } from 'entities/session';
import { AuthContext } from './AuthContext';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const user = useSessionStore((state) => state.user);
  const accessToken = useSessionStore((state) => state.accessToken);
  const loading = useSessionStore((state) => state.loading);
  const setAccessToken = useSessionStore((state) => state.setAccessToken);
  const setUser = useSessionStore((state) => state.setUser);
  const clearSession = useSessionStore((state) => state.clearSession);
  const setLoading = useSessionStore((state) => state.setLoading);
  const setSessionExpired = useSessionStore((state) => state.setSessionExpired);

  const fetchUserProfile = useCallback(async () => {
    try {
      const response = await getUserProfile();
      const { user: refreshedUser } = response.data.data;
      setUser(refreshedUser);
    } catch (error) {
      console.log('profile fetching error', error);
    }
  }, []);

  const initialize = useCallback(async () => {
    setLoading(true);
    try {
      if (accessToken) {
        await fetchUserProfile();
      } else {
        clearSession();
      }
    } finally {
      setLoading(false);
    }
  }, [accessToken, clearSession, fetchUserProfile, setLoading]);

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (loginUserDto: LoginUserDto) => {
      const response = await loginUser(loginUserDto);
      const { accessToken: token, user: loggedInUser } = response.data.data;

      setAccessToken(token);
      setSessionExpired(false);
      setUser(loggedInUser);
      return response.data;
    },
    [setAccessToken, setSessionExpired, setUser]
  );

  const register = useCallback(async (registerUserDto: RegisterUserDto) => {
    const response = await registerUser(registerUserDto);
    return response.data;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    clearSession();
    setSessionExpired(false);
  }, [clearSession, setSessionExpired]);

  const checkAuthenticated = accessToken && user ? 'authenticated' : 'unauthenticated';

  const status = loading || (accessToken && !user) ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      //
      login,
      logout,
      register,
      refreshProfile: fetchUserProfile,
    }),
    [status, user, login, logout, register, fetchUserProfile]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
