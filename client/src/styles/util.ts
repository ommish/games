import { Color, GameName, Shade } from 'types';

function gameNameClassPrefix(gameName: GameName | null): string {
  switch (gameName) {
    case null:
      return '';
    case 'brilliance':
      return 'brilliance-';
    case 'desert-adventure':
      return 'desert-';
    case 'dixthis':
      return 'dixthis-';
  }
}

export function bg(gameName: GameName | null, color: Color, shade: Shade) {
  return `bg-${gameNameClassPrefix(gameName)}${color}-${shade}`;
}

export function text(gameName: GameName | null, color: Color, shade: Shade) {
  return `text-${gameNameClassPrefix(gameName)}${color}-${shade}`;
}

export function border(gameName: GameName | null, color: Color, shade: Shade) {
  return `border-${gameNameClassPrefix(gameName)}${color}-${shade}`;
}
