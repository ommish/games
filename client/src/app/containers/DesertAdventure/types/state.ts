import { Game } from './game';

export type DesertAdventureState = {
  game: Game | null;
  playerName: string | null;
};
