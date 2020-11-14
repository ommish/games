export const MAX_PLAYERS = 8;
export const MIN_PLAYERS = 4;

export const POINTS_TO_WIN = 30;
export const HAND_SIZE = 7;

export const DECK = new Array(282).fill(null).map((_, i) => `${i}.jpg`);
export const SPECIAL_DECK = new Array(32)
  .fill(null)
  .map((_, i) => `special_${i}.jpg`);
export const PG13_DECK = new Array(21)
  .fill(null)
  .map((_, i) => `pg13_${i}.jpg`);

export const ROUND_WAIT = 20_000;

export const TITLE_COUNT = 20;

export const VALIDATION = {
  hint: {
    minLength: 1,
    maxLength: 100,
  },
  playerName: {
    minLength: 1,
    maxLength: 20,
  },
  playerPoints: {
    min: 0,
    max: 999 - 1,
  },
  pointsToWin: {
    min: 1,
    max: 999,
  },
};
