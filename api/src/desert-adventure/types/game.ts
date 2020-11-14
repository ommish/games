export type Treasure = {
  level: 1 | 2 | 3 | 4;
  points: number;
};

export type DieValue = 1 | 2 | 3;

export const COLORS = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'violet',
] as const;
export type Color = typeof COLORS[number];

export type Player = {
  name: string;
  treasure: Record<number, Treasure[][]>;
  position: number;
  returning: boolean;
  color: Color;
};

export type TreasureAction =
  | 'take-treasure'
  | 'drop-treasure'
  | 'ignore-treasure';

export type Game = {
  id: string;
  players: Player[];
  round: number;
  rounds: number;
  state: 'active' | 'inactive' | 'over';
  phase: 'select-direction' | 'roll-dice' | 'handle-space';
  activePlayer: number;
  path: (Treasure[] | null)[];
  updatedAt?: string;
  water: number;
};
