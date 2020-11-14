import {
  Color,
  COLORS,
  Game,
  Player,
  Treasure,
  TreasureAction,
} from '../types';
import { v4 } from 'uuid';
import { random, shuffle } from 'lodash';
import * as schema from './schema';
import { MAX_PLAYERS, MIN_PLAYERS, STARTING_WATER } from './constants';
import { selectGame, selectPlayer } from './state/selectors';
import { store } from '../../state/store';
import * as actions from './state/actions';
import * as socketActions from '../websocket/state/actions';
import { getLogger } from '../../util/logger';

const log = getLogger('game.service');

const getColor = (exlude: Color[] = []): Color => {
  let color: Color;
  while (!color || exlude.includes(color)) {
    color = COLORS[random(COLORS.length - 1, false)];
  }
  return color;
};

const makePath = (): Treasure[][] => {
  let treasures: Treasure[][] = [];
  for (let level: Treasure['level'] = 1; level <= 4; level++) {
    const levelPoints = new Array(4)
      .fill(null)
      .map((t, i) => i + level - 1 + (level - 1) * 3);
    treasures = treasures.concat(
      shuffle(levelPoints.concat(levelPoints)).map<Treasure[]>(points => [
        {
          level,
          points,
        },
      ]),
    );
  }
  return treasures;
};

const makeTreasures = (rounds: number): Record<number, Treasure[][]> => {
  const treasures: Record<number, Treasure[][]> = {};
  for (let i = 1; i <= rounds; i++) {
    treasures[i] = [];
  }
  return treasures;
};

export const createGame = ({
  playerName,
  rounds,
}: {
  playerName: string;
  rounds: number;
}): { gameId: string; playerName: string } => {
  log.info(`Creating new game`);
  const player: Player = {
    name: schema.playerName.parse(playerName.trim()),
    treasure: {
      1: [],
      2: [],
      3: [],
    },
    position: -1,
    returning: false,
    color: getColor(),
  };

  const game: Game = {
    id: v4(),
    state: 'inactive',
    round: 1,
    rounds: schema.rounds.parse(rounds),
    players: [],
    phase: 'roll-dice',
    path: makePath(),
    activePlayer: 0,
    water: STARTING_WATER,
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
    treasure: makeTreasures(game.rounds),
    position: -1,
    returning: false,
    color: 'red', // placeholder for now
  };
  if (game.players.some(({ name }) => name === player.name)) {
    log.info(`Player ${player.name} already in game ${gameId}`);
    return { game: selectGame(gameId), playerName: player.name };
  }
  if (game.players.length >= MAX_PLAYERS) {
    throw new Error(`Game ${gameId} is at max capacity`);
  }
  player.color = getColor(game.players.map(({ color }) => color));
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

export const getActivePlayer = (gameId: string, playerName: string): Player => {
  const { activePlayer, players } = getGame(gameId);
  if (players[activePlayer].name !== playerName) {
    throw new Error(
      `Player ${playerName} not the active player of game ${gameId}`,
    );
  }
  return selectPlayer(gameId, playerName);
};

export const getActiveGame = (gameId: string): Game => {
  const game = getGame(gameId);
  if (game.state !== 'active') {
    throw new Error(`Game ${gameId} not active`);
  }
  return game;
};

export const getGameInPhase = (gameId: string, phase: Game['phase']): Game => {
  const game = getActiveGame(gameId);
  if (game.phase !== phase) {
    throw new Error(`Invalid game phase ${game.phase}`);
  }
  return game;
};

export const setPlayerDirection = (
  gameId: string,
  playerName: string,
  { returning }: { returning: boolean },
): { game: Game; playerName: string } => {
  log.info(`Player ${playerName} turning around for game ${gameId}`);
  const game = getGameInPhase(gameId, 'select-direction');
  const player = getActivePlayer(gameId, playerName);
  if (!returning && player.returning) {
    throw new Error(`Can't make returning player go back out`);
  }
  store.dispatch(actions.setPlayerDirection(game.id, player.name, returning));
  return { game: selectGame(gameId), playerName };
};

export const movePlayer = (
  gameId: string,
  playerName: string,
  { roll }: { roll: number },
): { game: Game; playerName: string } => {
  log.info(`Player ${playerName} moving for game ${gameId}`);
  getGameInPhase(gameId, 'roll-dice');
  const player = getActivePlayer(gameId, playerName);
  schema.roll.parse(roll);
  store.dispatch(actions.movePlayer(gameId, player.name, roll));
  return { game: selectGame(gameId), playerName };
};

export const handleTreasure = (
  gameId: string,
  playerName: string,
  {
    action,
    dropIndex,
  }: {
    action: TreasureAction;
    dropIndex?: number;
  },
): { game: Game; playerName: string } => {
  log.info(`Player ${playerName} taking treasure for game ${gameId}`);
  switch (action) {
    case 'take-treasure':
      return takeTreasure(gameId, playerName);
    case 'drop-treasure':
      return dropTreasure(gameId, playerName, { dropIndex });
    case 'ignore-treasure':
      return ignoreTreasure(gameId, playerName);
    default:
      throw new Error(`Unrecognized action ${action}`);
  }
};

export const takeTreasure = (
  gameId: string,
  playerName: string,
): { game: Game; playerName: string } => {
  log.info(`Player ${playerName} taking treasure for game ${gameId}`);
  const game = getGameInPhase(gameId, 'handle-space');
  const player = getActivePlayer(gameId, playerName);
  const space = game.path[player.position];
  if (!space) {
    throw new Error(`No treasure on space ${space} of game ${gameId}`);
  }
  store.dispatch(actions.takeTreasure(gameId, playerName));
  return { game: selectGame(gameId), playerName };
};

export const dropTreasure = (
  gameId: string,
  playerName: string,
  { dropIndex }: { dropIndex: number },
): { game: Game; playerName: string } => {
  log.info(`Player ${playerName} leaving treasure for game ${gameId}`);
  const game = getGameInPhase(gameId, 'handle-space');
  const player = getActivePlayer(gameId, playerName);
  schema.treasureIndex(player.treasure[game.round].length).parse(dropIndex);
  const space = game.path[player.position];
  if (space) {
    throw new Error(`Treasure already on space ${space} of game ${gameId}`);
  }
  store.dispatch(actions.dropTreasure(gameId, playerName, dropIndex));
  return { game: selectGame(gameId), playerName };
};

export const ignoreTreasure = (
  gameId: string,
  playerName: string,
): { game: Game; playerName: string } => {
  log.info(`Player ${playerName} ignoring treasure for game ${gameId}`);
  const game = getGameInPhase(gameId, 'handle-space');
  const player = getActivePlayer(gameId, playerName);
  store.dispatch(actions.ignoreTreasure(gameId, playerName));
  return { game: selectGame(gameId), playerName };
};
