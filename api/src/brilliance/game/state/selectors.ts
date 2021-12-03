import { Game, GameState, Player } from '../../types';
import { store } from '../../../state/store';

export function selectGames(): GameState {
  return store.getState().brilliance.games;
}

export function selectGame(gameId: string): Game {
  return selectGames()[gameId];
}

export function selectPlayer(gameId: string, playerName: string): Player {
  return selectGame(gameId).players.find(({ name }) => name === playerName);
}
