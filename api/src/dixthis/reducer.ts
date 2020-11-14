import { combineReducers } from 'redux';
import { SocketReducer } from './websocket/state/reducer';
import { GameReducer } from './game/state/reducer';

export const DixthisReducer = combineReducers({
  games: GameReducer,
  sockets: SocketReducer,
});
