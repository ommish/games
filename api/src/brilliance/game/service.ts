import {
  Game,
  Player,
  TakeTokensAction,
  ReserveCardAction,
  PurchaseCardAction,
  Deck,
} from '../types';
import { v4 } from 'uuid';
import * as schema from './schema';
import {
  CARD_POOL_SIZE,
  MAX_PLAYERS,
  MIN_PLAYERS,
  PURSE_SIZE,
  EMPTY_TOKEN_POOL,
  POINTS_TO_WIN,
} from '../constants';
import { selectGame, selectPlayer } from './state/selectors';
import { last, shuffle } from 'lodash';
import { store } from '../../state/store';
import * as actions from './state/actions';
import * as socketActions from '../websocket/state/actions';
import { getLogger } from '../../util/logger';
import {
  sumTokens,
  keys,
  getPlayerResourceCount,
  sumPoints,
  replaceCard,
} from '../utils';
import { DECK, NOBLES } from '../fixtures';

const log = getLogger('game.service');

export const createGame = ({
  playerName,
}: {
  playerName: string;
}): { gameId: string; playerName: string } => {
  log.info(`Creating new game`);
  const player: Player = {
    name: schema.playerName.parse(playerName.trim()),
    hand: [],
    reserve: [],
    nobles: [],
    purse: { ...EMPTY_TOKEN_POOL },
  };
  const game: Game = {
    id: v4(),
    state: 'inactive',
    players: [],
    deck: {
      1: shuffle(DECK[1]),
      2: shuffle(DECK[2]),
      3: shuffle(DECK[3]),
    },
    noblePool: NOBLES,
    cardPool: {
      1: [],
      2: [],
      3: [],
    },
    tokenPool: { ...EMPTY_TOKEN_POOL },
    currentPlayer: 0,
  };
  for (let i = 0; i < CARD_POOL_SIZE; i++) {
    replaceCard(game, 1, i);
    replaceCard(game, 2, i);
    replaceCard(game, 3, i);
  }
  store.dispatch(actions.receiveGame(game));
  store.dispatch(actions.receivePlayer(game.id, player));
  return { gameId: game.id, playerName: player.name };
};

export const getGame = (gameId: string): Game => {
  const game = selectGame(gameId);
  if (!game) throw new Error(`Game ${gameId} not found`);
  return game;
};

export const joinGame = (
  gameId: string,
  { playerName }: { playerName: string },
): { game: Game; playerName: string } => {
  log.info(`Joining game ${gameId}`);
  const game = getGame(gameId);
  const player: Player = {
    name: schema.playerName.parse(playerName.trim()),
    hand: [],
    reserve: [],
    nobles: [],
    purse: { ...EMPTY_TOKEN_POOL },
  };
  if (game.players.some(({ name }) => name === player.name)) {
    log.info(`Player ${player.name} already in game ${gameId}`);
    return { game: selectGame(gameId), playerName: player.name };
  }
  if (game.players.length >= MAX_PLAYERS) {
    throw new Error(`Game ${gameId} is at max capacity`);
  }
  store.dispatch(actions.receivePlayer(gameId, player));
  return { game: selectGame(gameId), playerName: player.name };
};

export const removePlayer = (gameId: string, playerName: string): Game => {
  log.info(`Removing player ${playerName} from game ${gameId}`);
  const game = getGame(gameId);
  if (!game.players.some(({ name }) => name === playerName)) {
    log.info(`Player not in game ${gameId}`);
    return;
  }
  if (game.players.length - 1 === 0 || game.state === 'active') {
    store.dispatch(actions.clearGame(gameId));
    log.info(
      `${
        game.players.length - 1 === 0
          ? 'Removing last player'
          : 'Interrupting active game'
      }, clearing game ${gameId}`,
    );
    return;
  }
  store.dispatch(actions.removePlayer(gameId, playerName));
  return selectGame(gameId);
};

export const startGame = (gameId: string): Game => {
  const game = getGame(gameId);
  log.info(`Starting game ${gameId}`);
  if (game.players.length < MIN_PLAYERS) {
    throw new Error(`Game ${gameId} requires ${MIN_PLAYERS} players to start`);
  }
  store.dispatch(actions.startGame(gameId));
  return selectGame(gameId);
};

export const clearGame = (gameId: string) => {
  log.info(`Clearing game ${gameId}`);
  store.dispatch(actions.clearGame(gameId));
  store.dispatch(socketActions.removeSockets(gameId));
};

export const getPlayer = (gameId: string, playerName: string): Player => {
  const player = selectPlayer(gameId, playerName);
  if (!player) {
    throw new Error(`Player ${playerName} does not belong to game ${gameId}`);
  }
  return player;
};

export const getActiveGame = (gameId: string): Game => {
  const game = getGame(gameId);
  if (game.state !== 'active') {
    throw new Error(`Game ${gameId} not active`);
  }
  return game;
};

export const takeTurn = (
  gameId: string,
  playerName: string,
  action: TakeTokensAction | ReserveCardAction | PurchaseCardAction,
): Game => {
  log.info(`Player ${playerName} guessing card for game ${gameId}`);
  const game = getActiveGame(gameId);
  const player = getPlayer(gameId, playerName);
  if (game.players[game.currentPlayer].name === player.name) {
    throw new Error(`It's not your turn, ${playerName}`);
  }
  switch (action.type) {
    case 'take-tokens': {
      // Validate taken tokens
      const twoOfSame =
        keys(action.draw).length === 1 && sumTokens(action.draw) === 2;
      if (twoOfSame) {
        if (game.tokenPool[keys(action.draw)[0]] < 4) {
          throw new Error(
            `Can't take more than 2 of the same token unless there are at least 4`,
          );
        }
      } else {
        if (keys(action.draw).length > 3) {
          throw new Error(`Can't take more than 3 different tokens`);
        } else if (Object.values(action.draw).some(amount => amount !== 1)) {
          throw new Error(
            `Can take only 1 of the each token if taking more than 2 types of tokens`,
          );
        } else if (keys(action.draw).some(token => !game.tokenPool[token])) {
          throw new Error(`Not enough tokens`);
        }
      }
      // Validate ending hand size
      const purseCount = sumTokens(player.purse);
      const takeCount = sumTokens(action.draw);
      const discardCount = sumTokens(action.discard);
      if (purseCount + takeCount - discardCount > PURSE_SIZE) {
        throw new Error(`Can't end your turn with more than 10 tokens`);
      }
      if (
        keys(action.discard).some(
          token =>
            player.hand[token] + action.draw[token] < action.discard[token],
        )
      ) {
        throw new Error(`Can't discard tokens you don't have`);
      }
      store.dispatch(actions.takeTokens(gameId, action.draw, action.discard));
      break;
    }
    case 'purchase-card': {
      const card =
        action.source === 'reserve'
          ? player.reserve[action.index]
          : game.cardPool[action.source][action.index];
      if (!card) {
        throw new Error(`Card not found`);
      }
      keys(card.cost).forEach(resource => {
        if (
          action.tokens[resource] > getPlayerResourceCount(player, resource)
        ) {
          throw new Error(`Can't afford that.`);
        }
      });
      const missingCost = keys(card.cost).reduce(
        (acc, resource) =>
          acc +
          Math.max(
            0,
            card.cost[resource] -
              player.hand.filter(card => card.resource === resource).length -
              player.purse[resource],
          ),
        0,
      );
      if (player.purse.gold < missingCost) {
        throw new Error(`Can't afford card`);
      }
      store.dispatch(
        actions.purchaseCard(
          gameId,
          action.source,
          action.index,
          action.tokens,
        ),
      );
      break;
    }
    case 'reserve-card':
      const card = game.cardPool[action.level][action.index];
      if (!card) {
        throw new Error(`Card not found`);
      }
      if (sumTokens(player.purse) + 1 > PURSE_SIZE && !action.discard) {
        throw new Error(`Can't end your turn with more than 10 tokens`);
      }
      if (action.discard !== 'gold' && !player.purse[action.discard]) {
        throw new Error(`Can't discard tokens you don't have`);
      }
      store.dispatch(
        actions.reserveCard(gameId, action.level, action.index, action.discard),
      );
      break;
  }
  if (
    last(game.players).name === player.name &&
    game.players.find(player => {
      sumPoints(player) >= POINTS_TO_WIN;
    })
  ) {
    store.dispatch(actions.endGame(gameId));
  } else {
    store.dispatch(actions.startTurn(gameId));
  }
  return selectGame(gameId);
};
