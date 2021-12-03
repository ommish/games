import url from 'url';
import * as http from 'http';
import { GameName } from '../types';
import { BRILLIANCE } from '../brilliance/constants';

export function getGameId(
  request: http.IncomingMessage,
): [GameName, string] | undefined {
  const { pathname } = url.parse(request.url, true);
  if (pathname.startsWith('/api/dixthis/')) {
    const [_, gameId] = pathname.split('/dixthis/');
    return ['dixthis', gameId];
  }
  if (pathname.startsWith(`/api/${BRILLIANCE}/`)) {
    const [_, gameId] = pathname.split(`/${BRILLIANCE}/`);
    return [BRILLIANCE, gameId];
  }
  if (pathname.startsWith('/api/desert-adventure/')) {
    const [_, gameId] = pathname.split('/desert-adventure/');
    return ['desert-adventure', gameId];
  }
  return undefined;
}
