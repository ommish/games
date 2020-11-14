import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../../../types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) =>
  state.desertAdventure || initialState;

export const selectGame = createSelector(
  [selectDomain],
  gameState => gameState.game,
);

export const selectGameState = createSelector(
  [selectDomain],
  gameState => gameState.game?.state,
);

export const selectGamePhase = createSelector(
  [selectDomain],
  gameState => gameState.game?.phase,
);

export const selectPlayers = createSelector(
  [selectGame],
  game => game?.players,
);

export const selectPlayer = createSelector([selectDomain], gameState =>
  gameState.playerName && gameState.game
    ? gameState.game.players.find(({ name }) => name === gameState.playerName)
    : null,
);

export const selectActivePlayer = createSelector(
  [selectGame],
  game => game?.players[game.activePlayer],
);
