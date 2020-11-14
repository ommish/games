import { flatten, last, uniq } from 'lodash';

export const MAX_PLAYERS = 6;
export const MIN_PLAYERS = 2;

export const CLOSE_WAIT = 45_000;

export const DIE_VALUES = [1, 2, 3] as const;
export const ROLL_VALUES = uniq(
  flatten(
    DIE_VALUES.map((val1, i) => DIE_VALUES.slice(i).map(val2 => val1 + val2)),
  ),
);

export const VALIDATION = {
  playerName: {
    minLength: 1,
    maxLength: 20,
  },
  rounds: {
    min: 1,
    max: 5,
  },
  roll: {
    min: ROLL_VALUES[0],
    max: last(ROLL_VALUES),
  },
} as const;

export const STARTING_WATER = 25;
