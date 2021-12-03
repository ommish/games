import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { sumPoints } from '../utils';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.brilliance || initialState;

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
  gameState => gameState.game?.currentPlayer,
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

export const selectLeadingPoints = createSelector([selectPlayers], players =>
  players && players.length > 0
    ? Math.max(...players.map(player => sumPoints(player)))
    : 0,
);

export const selectNextRoundAt = createSelector(
  [selectGame],
  game => game?.nextRoundAt,
);

export const selectActivePlayer = createSelector(
  [selectGame],
  game => game?.players[game?.currentPlayer],
);
