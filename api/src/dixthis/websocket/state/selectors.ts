import WebSocket from 'ws';
import { store } from '../../../state/store';
import { SocketsState } from '../../types';

function selectSockerServers(): SocketsState {
  return store.getState().dixthis.sockets;
}

export function selectGameSockerServers(gameId: string): WebSocket[] {
  return selectSockerServers()[gameId];
}
