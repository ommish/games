import { TokenPool } from './types';

export const BRILLIANCE = 'brilliance';

export const MAX_PLAYERS = 4;
export const MIN_PLAYERS = 2;

export const POINTS_TO_WIN = 15;

export const PURSE_SIZE = 10;

export const CARD_POOL_SIZE = 4;

export const CURRENCY_POOL_SIZE_BY_PLAYER_COUNT = {
  2: 5,
  3: 7,
  4: 7,
};

export const VALIDATION = {
  playerName: {
    minLength: 1,
    maxLength: 20,
  },
} as const;

export const TOKEN_TYPES = [
  'chocolate',
  'emerald',
  'sapphire',
  'diamond',
  'ruby',
  'gold',
] as const;

export const RESOURCE_TYPES = [
  'chocolate',
  'emerald',
  'sapphire',
  'diamond',
  'ruby',
] as const;

export const EMPTY_TOKEN_POOL: TokenPool = {
  chocolate: 0,
  sapphire: 0,
  emerald: 0,
  diamond: 0,
  ruby: 0,
  gold: 0,
};
