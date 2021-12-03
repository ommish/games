import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { BRILLIANCE } from '../constants';
import { BrillianceState, Game } from '../types';

export const initialState: BrillianceState = {
  playerName: '',
  game: null,
};

const gameSlice = createSlice({
  name: BRILLIANCE,
  initialState,
  reducers: {
    setPlayer(state, action: PayloadAction<string>) {
      state.playerName = action.payload;
    },
    receiveGame(state, action: PayloadAction<Game | null>) {
      state.game = action.payload;
    },
  },
});

export const { actions, reducer, name: sliceKey } = gameSlice;
