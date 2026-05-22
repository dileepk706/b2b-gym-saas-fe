import { useEffect, useCallback, useMemo, useState } from 'react';
// auth utils
import { getUserProfile, loginUser, logoutUser, registerUser } from 'shared/api/api.services';
import { LoginUserDto, RegisterUserDto } from 'shared/api/api.types';
import { User } from 'entities/user/user.entity';
import { useAuthStore } from '@stores/auth.store';
import { AuthContext } from './AuthContext';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  const accessToken = useAuthStore((state) => state.accessToken);
  const loading = useAuthStore((state) => state.loading);
  const loginStore = useAuthStore((state) => state.login);
  const logoutStore = useAuthStore((state) => state.logout);
  const setLoading = useAuthStore((state) => state.setLoading);
  const setSessionExpired = useAuthStore((state) => state.setSessionExpired);

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
        logoutStore();
      }
    } finally {
      setLoading(false);
    }
  }, [accessToken, fetchUserProfile, logoutStore, setLoading]);

  useEffect(() => {
    initialize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = useCallback(
    async (loginUserDto: LoginUserDto) => {
      const response = await loginUser(loginUserDto);
      const { accessToken: token, user: loggedInUser } = response.data.data;

      loginStore({ accessToken: token });
      setSessionExpired(false);
      setUser(loggedInUser);
      return response.data;
    },
    [loginStore, setSessionExpired]
  );

  const register = useCallback(async (registerUserDto: RegisterUserDto) => {
    const response = await registerUser(registerUserDto);
    return response.data;
  }, []);

  const logout = useCallback(async () => {
    await logoutUser();
    logoutStore();
    setSessionExpired(false);
  }, [logoutStore, setSessionExpired]);

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
