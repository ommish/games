import { Game, Player } from '../../types';

export type ReceiveGame = ReturnType<typeof receiveGame>;
export const receiveGame = (game: Game) =>
  ({
    type: 'desert-adventure/RECEIVE_GAME',
    game,
  } as const);

export type ReceivePlayer = ReturnType<typeof receivePlayer>;
export const receivePlayer = (gameId: string, player: Player) =>
  ({
    type: 'desert-adventure/RECEIVE_PLAYER',
    gameId,
    player,
  } as const);

export type RemovePlayer = ReturnType<typeof removePlayer>;
export const removePlayer = (gameId: string, playerName: string) =>
  ({
    type: 'desert-adventure/REMOVE_PLAYER',
    gameId,
    playerName,
  } as const);

export type ClearGame = ReturnType<typeof clearGame>;
export const clearGame = (gameId: string) =>
  ({
    type: 'desert-adventure/CLEAR_GAME',
    gameId,
  } as const);

export type StartGame = ReturnType<typeof startGame>;
export const startGame = (gameId: string) =>
  ({
    type: 'desert-adventure/START_GAME',
    gameId,
  } as const);

export type SetPlayerDirection = ReturnType<typeof setPlayerDirection>;
export const setPlayerDirection = (
  gameId: string,
  playerName: string,
  returning: boolean,
) =>
  ({
    type: 'desert-adventure/SET_PLAYER_DIRECTION',
    gameId,
    playerName,
    returning,
  } as const);

export type MovePlayer = ReturnType<typeof movePlayer>;
export const movePlayer = (gameId: string, playerName: string, roll: number) =>
  ({
    type: 'desert-adventure/MOVE_PLAYER',
    gameId,
    playerName,
    roll,
  } as const);

export type TakeTreasure = ReturnType<typeof takeTreasure>;
export const takeTreasure = (gameId: string, playerName: string) =>
  ({
    type: 'desert-adventure/TAKE_TREASURE',
    gameId,
    playerName,
  } as const);

export type IgnoreTreasure = ReturnType<typeof ignoreTreasure>;
export const ignoreTreasure = (gameId: string, playerName: string) =>
  ({
    type: 'desert-adventure/IGNORE_TREASURE',
    gameId,
    playerName,
  } as const);

export type LeaveTreasure = ReturnType<typeof dropTreasure>;
export const dropTreasure = (
  gameId: string,
  playerName: string,
  treasureIndex: number,
) =>
  ({
    type: 'desert-adventure/DROP_TREASURE',
    gameId,
    playerName,
    treasureIndex,
  } as const);

export type GameAction =
  | ReceiveGame
  | ReceivePlayer
  | RemovePlayer
  | ClearGame
  | StartGame
  | SetPlayerDirection
  | MovePlayer
  | TakeTreasure
  | LeaveTreasure
  | IgnoreTreasure;
