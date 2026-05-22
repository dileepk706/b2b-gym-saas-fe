import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type AuthState = {
  accessToken: string | null;
  loading: boolean;
  sessionExpired: boolean;
  setLoading: (loading: boolean) => void;
  login: (payload: { accessToken: string }) => void;
  logout: () => void;
  setSessionExpired: (sessionExpired: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      loading: false,
      sessionExpired: false,
      setLoading: (loading) => set({ loading }),
      login: ({ accessToken }) => set({ accessToken, loading: false }),
      logout: () => set({ accessToken: null, loading: false }),
      setSessionExpired: (sessionExpired) => set({ sessionExpired }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ accessToken: state.accessToken }),
    }
  )
);
