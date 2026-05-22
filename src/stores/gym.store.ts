import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

type GymState = {
  selectedGymId: string | null;
  setSelectedGymId: (selectedGymId: string | null) => void;
  clearSelectedGym: () => void;
};

export const useGymStore = create<GymState>()(
  persist(
    (set) => ({
      selectedGymId: null,
      setSelectedGymId: (selectedGymId) => set({ selectedGymId }),
      clearSelectedGym: () => set({ selectedGymId: null }),
    }),
    {
      name: 'gym-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
