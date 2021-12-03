import { Game, Player, playerTitles, PoolItem } from '../types';
import { v4 } from 'uuid';
import { random } from 'lodash';
import * as schema from './schema';
import {
  MAX_PLAYERS,
  DECK,
  HAND_SIZE,
  PG13_DECK,
  MIN_PLAYERS,
} from '../constants';
import { selectGame, selectOriginalCard, selectPlayer } from './state/selectors';
import { shuffle } from 'lodash';
import { store } from '../../state/store';
import * as actions from './state/actions';
import * as socketActions from '../websocket/state/actions';
import { getLogger } from '../../util/logger';

const log = getLogger('game.service');

function getTitle() {
  return playerTitles[random(0, playerTitles.length - 1)];
}

function buildDeck() {
  return shuffle(shuffle(DECK).concat(shuffle(PG13_DECK)));
}

export const createGame = ({
  playerName,
  pointsToWin,
  deck,
}: {
  playerName: string;
  pointsToWin?: number | null;
  deck?: string[];
}): { gameId: string; playerName: string } => {
  log.info(`Creating new game`);
  const player: Player = {
    name: schema.playerName.parse(playerName.trim()),
    hand: [],
    points: 0,
    title: getTitle(),
  };

  const game: Game = {
    id: v4(),
    state: 'inactive',
    deck: deck || buildDeck(),
    players: [],
    phase: 'selecting-hint',
    hint: null,
    pool: [],
    guesses: [],
    onDeck: {
      name: player.name,
      index: 0,
    },
    pointsToWin: schema.pointsToWin.parse(pointsToWin) || null,
  };
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
  { playerName, points }: { playerName: string; points: number },
): { game: Game; playerName: string } => {
  log.info(`Joining game ${gameId}`);
  const game = getGame(gameId);
  const player: Player = {
    name: schema.playerName.parse(playerName.trim()),
    hand: [],
    points: schema.playerPoints.parse(points || 0),
    title: getTitle(),
  };
  if (game.players.some(({ name }) => name === player.name)) {
    log.info(`Player ${player.name} already in game ${gameId}`);
    return { game: selectGame(gameId), playerName: player.name };
  }
  if (game.players.length >= MAX_PLAYERS) {
    throw new Error(`Game ${gameId} is at max capacity`);
  }
  if (game.deck.length < HAND_SIZE) {
    throw new Error(`Not enough cards left to deal a full hand`);
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
  if (game.players.length - 1 === 0) {
    store.dispatch(actions.clearGame(gameId));
    log.info(`Removing last player, clearing game ${gameId}`);
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

export const getGameInPoolPhase = (
  gameId: string,
  phase: Game['phase'],
): Game => {
  const game = getActiveGame(gameId);
  if (game.phase !== phase) {
    throw new Error(`Invalid game phase ${game.phase}`);
  }
  return game;
};

export const getPlayerCard = (player: Player, card: string): string => {
  if (!player.hand.includes(card)) {
    {
      throw new Error(`Card ${card} not found in hand`);
    }
  }
  return card;
};

export const getPoolCard = (pool: PoolItem[], card: string): string => {
  if (!pool.find(submittedCard => submittedCard.card === card)) {
    {
      throw new Error(`Card ${card} not found in pool`);
    }
  }
  return card;
};

export const selectHint = (
  gameId: string,
  playerName: string,
  {
    hint,
    card,
  }: {
    hint: string;
    card: string;
  },
): Game => {
  log.info(`Player ${playerName} picking hint for game ${gameId}`);
  const game = getGameInPoolPhase(gameId, 'selecting-hint');
  const player = getPlayer(gameId, playerName);
  if (game.onDeck.name !== player.name) {
    throw new Error(`Only active player may pick hint`);
  }
  getPlayerCard(player, card);
  store.dispatch(
    actions.selectHint(
      gameId,
      playerName,
      schema.hint.parse(hint.trim()),
      card,
    ),
  );
  return selectGame(gameId);
};

export const submitCard = (
  gameId: string,
  playerName: string,
  { card }: { card: string },
): Game => {
  log.info(`Player ${playerName} submitting card for game ${gameId}`);
  getGameInPoolPhase(gameId, 'submitting-cards');
  const player = getPlayer(gameId, playerName);
  const originalCard = selectOriginalCard(gameId);
  if (originalCard.player === player.name) {
    throw new Error(`Player who picked hint may not submit a card`);
  }
  getPlayerCard(player, card);
  store.dispatch(actions.submitCard(gameId, playerName, card));
  return selectGame(gameId);
};

export const guessCard = (
  gameId: string,
  playerName: string,
  { card }: { card: string },
): Game => {
  log.info(`Player ${playerName} guessing card for game ${gameId}`);
  const game = getGameInPoolPhase(gameId, 'guessing-original');
  const player = getPlayer(gameId, playerName);
  const originalCard = selectOriginalCard(gameId);
  if (originalCard.player === player.name) {
    throw new Error(`Player who picked hint may not submit a card`);
  }
  getPoolCard(game.pool, card);
  store.dispatch(actions.guessCard(gameId, playerName, card));
  return selectGame(gameId);
};

export const startRound = (gameId: string) => {
  log.info(`Starting new round for game ${gameId}`);
  getGameInPoolPhase(gameId, 'distributing-points');
  store.dispatch(actions.startRound(gameId));
};
