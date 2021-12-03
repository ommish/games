import { last } from 'lodash';
import { EMPTY_TOKEN_POOL } from './constants';
import {
  Card,
  CardLevel,
  Game,
  Player,
  Resource,
  Token,
  TokenPool,
} from './types';

export const startingTokenPool = (playerCount: number) => {
  const startingGold = 5;
  let startingTokens: number;
  switch (playerCount) {
    case 1:
    case 2:
      startingTokens = 4;
      break;
    case 3:
      startingTokens = 5;
      break;
    default:
      startingTokens = 7;
      break;
  }
  const pool = { ...EMPTY_TOKEN_POOL };
  keys(pool).forEach(key => {
    pool[key] = key === 'gold' ? startingGold : startingTokens;
  });
  return pool;
};

export const getCurrentPlayer = (game: Game) =>
  game.players[game.currentPlayer];

export const getFirstPlayer = (game: Game) => game.players[0];

export const getLastPlayer = (game: Game) => last(game.players);

export const getNextPlayer = (game: Game, idx: number) => game.players[idx + 1];

export const tokenPoolSum = (tokenPool: TokenPool): number =>
  Object.values(tokenPool).reduce((acc, amount) => acc + amount, 0);

export const transferTokensFromPool = (
  game: Game,
  token: Token,
  amount: number,
) => {
  const player = getCurrentPlayer(game);
  game.tokenPool[token] -= amount;
  player.purse[token] += amount;
};

export const replaceCard = (game: Game, level: CardLevel, index: number) => {
  if (game.deck[level].length) {
    game.cardPool[level][index] = game.deck[level].pop() as Card;
  }
};

export const drawCard = (
  game: Game,
  target: keyof Player & ('reserve' | 'hand'),
  source: 'reserve' | CardLevel,
  index: number,
) => {
  const player = game.players[game.currentPlayer];
  const targetCards = player[target];
  const sourceCards =
    source === 'reserve' ? player.reserve : game.cardPool[source];
  targetCards.push(sourceCards.splice(index, 1)[0]);
  if (source !== 'reserve') {
    replaceCard(game, source, index);
  }
};

export const sumTokens = (tokens: Partial<TokenPool>) =>
  Object.values(tokens).reduce<number>((acc, token) => acc + (token ?? 0), 0);

export const getPlayerResourceCount = (
  player: Player,
  resource: Resource,
): number =>
  player.hand.filter(card => card.resource === resource).length +
  player.purse[resource];

export const keys = <T extends object, K extends keyof T>(object: T): K[] =>
  Object.keys(object) as K[];

export const sumPoints = (player: Player): number =>
  player.hand.reduce((acc, card) => acc + card.points, 0) +
  player.nobles.reduce((acc, noble) => acc + noble.points, 0);
