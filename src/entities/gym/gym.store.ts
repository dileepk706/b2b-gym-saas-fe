import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { Gym } from './gym.type';

type GymState = {
  selectedGymId: string | null;
  setSelectedGymId: (selectedGymId: string | null) => void;
  clearSelectedGym: () => void;
};

type CurrentGymState = {
  currentGym: Gym | null;
  setCurrentGym: (currentGym: Gym | null) => void;
  clearCurrentGym: () => void;
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

export const useCurrentGymStore = create<CurrentGymState>()((set) => ({
  currentGym: null,
  setCurrentGym: (currentGym) => set({ currentGym }),
  clearCurrentGym: () => set({ currentGym: null }),
}));
