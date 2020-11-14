import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { DesertAdventureState, Game } from '../types';

export const initialState: DesertAdventureState = {
  playerName: '',
  game: null,
};

const gameSlice = createSlice({
  name: 'desertAdventure',
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
