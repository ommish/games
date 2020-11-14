import { PayloadAction } from '@reduxjs/toolkit';
import { ReactNode } from 'react';
import { Color, GameName } from 'types';
import { createSlice } from 'utils/@reduxjs/toolkit';
import { SnackbarState } from '../types';

export const initialState: SnackbarState = {
  isOpen: false,
  className: undefined,
  message: '',
};

const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    showSnackbar(
      state,
      action: PayloadAction<{
        className: Color;
        gameName: GameName;
        message: ReactNode;
      }>,
    ) {
      state.isOpen = true;
      state.className = action.payload.className;
      state.gameName = action.payload.gameName;
      state.message = action.payload.message;
    },
    hideSnackbar(state, action: PayloadAction) {
      state.isOpen = false;
      state.className = undefined;
      state.gameName = undefined;
    },
  },
});

export const { actions, reducer, name: sliceKey } = snackbarSlice;
