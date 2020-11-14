import { Game, Player } from '../../types';

export type ReceiveGame = ReturnType<typeof receiveGame>;
export const receiveGame = (game: Game) =>
  ({
    type: 'dixthis/RECEIVE_GAME',
    game,
  } as const);

export type ReceivePlayer = ReturnType<typeof receivePlayer>;
export const receivePlayer = (gameId: string, player: Player) =>
  ({
    type: 'dixthis/RECEIVE_PLAYER',
    gameId,
    player,
  } as const);

export type RemovePlayer = ReturnType<typeof removePlayer>;
export const removePlayer = (gameId: string, playerName: string) =>
  ({
    type: 'dixthis/REMOVE_PLAYER',
    gameId,
    playerName,
  } as const);

export type StartGame = ReturnType<typeof startGame>;
export const startGame = (gameId: string) =>
  ({
    type: 'dixthis/START_GAME',
    gameId,
  } as const);

export type ClearGame = ReturnType<typeof clearGame>;
export const clearGame = (gameId: string) =>
  ({
    type: 'dixthis/CLEAR_GAME',
    gameId,
  } as const);

export type SelectHint = ReturnType<typeof selectHint>;
export const selectHint = (
  gameId: string,
  playerName: string,
  hint: string,
  card: string,
) =>
  ({
    type: 'dixthis/PICK_WORD',
    gameId,
    playerName,
    hint,
    card,
  } as const);

export type SubmitCard = ReturnType<typeof submitCard>;
export const submitCard = (gameId: string, playerName: string, card: string) =>
  ({
    type: 'dixthis/SUBMIT_CARD',
    gameId,
    playerName,
    card,
  } as const);

export type GuessCard = ReturnType<typeof guessCard>;
export const guessCard = (gameId: string, playerName: string, card: string) =>
  ({
    type: 'dixthis/GUESS_CARD',
    gameId,
    playerName,
    card,
  } as const);

export type StartRound = ReturnType<typeof startRound>;
export const startRound = (gameId: string) =>
  ({
    type: 'dixthis/START_ROUND',
    gameId,
  } as const);

export type GameAction =
  | ReceiveGame
  | ReceivePlayer
  | RemovePlayer
  | StartGame
  | ClearGame
  | SelectHint
  | SubmitCard
  | GuessCard
  | StartRound;
