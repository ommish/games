import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.snackbar || initialState;

export const selectSnackbar = createSelector(
  [selectDomain],
  snackState => snackState,
);
