import { SocketsState } from '../../types';
import { SocketAction } from './actions';

export const SocketReducer = (
  state: SocketsState = {},
  action: SocketAction,
) => {
  const newState = { ...state };
  switch (action.type) {
    case 'desert-adventure/RECEIVE_SOCKET':
      newState[action.gameId] = [
        ...(newState[action.gameId] || []),
        action.socket,
      ];
      return newState;
    case 'desert-adventure/REMOVE_SOCKETS':
      (newState[action.gameId] || []).forEach(wss => wss.close());
      delete newState[action.gameId];
      return newState;
    default:
      return state;
  }
};
