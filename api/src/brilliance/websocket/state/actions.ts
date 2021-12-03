import WebSocket from 'ws';

export type ReceiveSocket = ReturnType<typeof receiveSocket>;
export const receiveSocket = (gameId: string, socket: WebSocket) =>
  ({
    type: 'brilliance/RECEIVE_SOCKET',
    gameId,
    socket,
  } as const);

export type RemoveSockets = ReturnType<typeof removeSockets>;
export const removeSockets = (gameId: string) =>
  ({
    type: 'brilliance/REMOVE_SOCKETS',
    gameId,
  } as const);

export type SocketAction = ReceiveSocket | RemoveSockets;
