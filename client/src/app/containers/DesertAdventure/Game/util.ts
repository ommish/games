import { flattenDeep } from 'lodash';
import { Player, Treasure } from '../types';

export function totalPoints(player: Player): number {
  const treasure: Treasure[] = flattenDeep(
    Object.keys(player.treasure).map(round => player.treasure[parseInt(round)]),
  );
  return treasure.reduce<number>((acc, treasure) => acc + treasure.points, 0);
}
