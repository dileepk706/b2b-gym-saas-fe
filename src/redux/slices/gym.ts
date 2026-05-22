import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Gym } from 'entities/gym/gym.type';

type GymState = {
  selectedGymId: string | null;
};

const initialState: GymState = {
  selectedGymId: null,
};

const gymSlice = createSlice({
  name: 'gym',
  initialState,
  reducers: {
    setSelectedGymId(state, action: PayloadAction<string | null>) {
      state.selectedGymId = action.payload;
    },
  },
});

export const { setSelectedGymId } = gymSlice.actions;

export default gymSlice.reducer;
