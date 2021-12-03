import WebSocket from 'ws';
import { Game } from './game';

export type GameState = Record<string, Game>;
export type SocketsState = Record<string, WebSocket[]>;

export type State = { games: GameState; sockets: SocketsState };
