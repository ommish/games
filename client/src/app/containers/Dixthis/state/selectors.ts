import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'types';
import { initialState } from './slice';

// First select the relevant part from the state
const selectDomain = (state: RootState) => state.dixthis || initialState;

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

export const selectHint = createSelector(
  [selectDomain],
  gameState => gameState.game?.hint,
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
    ? Math.max(...players.map(({ points }) => points))
    : 0,
);

export const selectSubmittedCards = createSelector(
  [selectGame],
  game => game?.pool,
);

export const selectSubmittedGuesses = createSelector(
  [selectGame],
  game => game?.guesses,
);

export const selectSubmittedCard = createSelector(
  [selectGame, selectPlayer],
  (game, player) => game?.pool.find(card => card.player === player?.name),
);

export const selectOriginalCard = createSelector(
  [selectGame, selectPlayer],
  game => game?.pool.find(card => card.original),
);

export const selectSubmittedGuess = createSelector(
  [selectGame, selectPlayer],
  (game, player) => game?.guesses.find(guess => guess.player === player?.name),
);

export const selectPlayerMayGuess = createSelector(
  [selectSubmittedCards, selectPlayer],
  (pool, player) =>
    !pool?.find(item => item.original && item.player === player?.name),
);

export const selectWinner = createSelector(
  [selectPlayers],
  players => players?.find,
);

export const selectNextRoundAt = createSelector(
  [selectGame],
  game => game?.nextRoundAt,
);

export const selectActivePlayer = createSelector(
  [selectGame, selectOriginalCard],
  (game, originalCard) => originalCard?.player || game?.onDeck.name,
);

export const selectOnDeckPlayer = createSelector(
  [selectGame],
  game => game?.onDeck.index,
);

export const selectPointsToWin = createSelector(
  [selectGame],
  game => game?.pointsToWin || null,
);
