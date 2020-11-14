import { Game, GameState, Player } from '../../types';
import { store } from '../../../state/store';

export function selectGames(): GameState {
  return store.getState().dixthis.games;
}

export function selectGame(gameId: string): Game {
  return selectGames()[gameId];
}

export function selectPlayer(gameId: string, playerName: string): Player {
  return selectGame(gameId).players.find(({ name }) => name === playerName);
}

export function selectOriginalCard(gameId: string): Game['pool'][0] {
  return selectGame(gameId).pool.find(({ original }) => original);
}

export const getFirstPlayer = (game: Game) => game.players[0];
export const getNextPlayer = (game: Game, idx: number) => game.players[idx + 1];
