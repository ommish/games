import { GameAction } from '../../game/state/actions';
import { SocketsState } from '../../types';
import { SocketAction } from './actions';

export const SocketReducer = (
  state: SocketsState = {},
  action: SocketAction | GameAction,
) => {
  const newState = { ...state };
  switch (action.type) {
    case 'brilliance/RECEIVE_SOCKET':
      newState[action.gameId] = [
        ...(newState[action.gameId] || []),
        action.socket,
      ];
      return newState;
    case 'brilliance/REMOVE_SOCKETS':
      (newState[action.gameId] || []).forEach(wss => wss.close());
      delete newState[action.gameId];
      return newState;
    default:
      return state;
  }
};
