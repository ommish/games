import { number } from 'zod';
import {
  Game,
  Player,
  TakeTokensAction,
  PurchaseCardAction,
  CardLevel,
  Token,
} from '../../types';

export type ReceiveGame = ReturnType<typeof receiveGame>;
export const receiveGame = (game: Game) =>
  ({
    type: 'brilliance/RECEIVE_GAME',
    game,
  } as const);

export type ReceivePlayer = ReturnType<typeof receivePlayer>;
export const receivePlayer = (gameId: string, player: Player) =>
  ({
    type: 'brilliance/RECEIVE_PLAYER',
    gameId,
    player,
  } as const);

export type RemovePlayer = ReturnType<typeof removePlayer>;
export const removePlayer = (gameId: string, playerName: string) =>
  ({
    type: 'brilliance/REMOVE_PLAYER',
    gameId,
    playerName,
  } as const);

export type StartGame = ReturnType<typeof startGame>;
export const startGame = (gameId: string) =>
  ({
    type: 'brilliance/START_GAME',
    gameId,
  } as const);

export type ClearGame = ReturnType<typeof clearGame>;
export const clearGame = (gameId: string) =>
  ({
    type: 'brilliance/CLEAR_GAME',
    gameId,
  } as const);

export type TakeTokens = ReturnType<typeof takeTokens>;
export const takeTokens = (
  gameId: string,
  draw: TakeTokensAction['draw'],
  discard: TakeTokensAction['discard'],
) =>
  ({
    type: 'brilliance/TAKE_TOKENS',
    gameId,
    draw,
    discard,
  } as const);

export type PurchaseCard = ReturnType<typeof purchaseCard>;
export const purchaseCard = (
  gameId: string,
  source: CardLevel | 'reserve',
  index: number,
  tokens: PurchaseCardAction['tokens'],
) =>
  ({
    type: 'brilliance/PURCHASE_CARD',
    gameId,
    source,
    index,
    tokens,
  } as const);

export type ReserveCard = ReturnType<typeof reserveCard>;
export const reserveCard = (
  gameId: string,
  level: CardLevel,
  index: number,
  discard: Token,
) =>
  ({
    type: 'brilliance/RESERVE_CARD',
    gameId,
    level,
    index,
    discard,
  } as const);

export type StartTurn = ReturnType<typeof startTurn>;
export const startTurn = (gameId: string) =>
  ({
    type: 'brilliance/START_TURN',
    gameId,
  } as const);

export type EndGame = ReturnType<typeof endGame>;
export const endGame = (gameId: string) =>
  ({
    type: 'brilliance/END_GAME',
    gameId,
  } as const);

export type GameAction =
  | ReceiveGame
  | ReceivePlayer
  | RemovePlayer
  | StartGame
  | ClearGame
  | TakeTokens
  | PurchaseCard
  | ReserveCard
  | TakeTokens
  | StartTurn
  | EndGame;
