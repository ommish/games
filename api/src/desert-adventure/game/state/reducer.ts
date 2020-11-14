import {
  getPlayerPosition,
  isSpaceOccupied,
  setPlayerPosition,
  endTurn,
} from '../util';
import produce from 'immer';
import { findIndex, shuffle } from 'lodash';
import { GameState } from '../../types';
import { MIN_PLAYERS } from '../constants';
import { GameAction } from './actions';
import { getLogger } from '../../../util/logger';

const log = getLogger('game.reducer');

export const GameReducer = (state: GameState = {}, action: GameAction) =>
  produce(state, draft => {
    switch (action.type) {
      case 'desert-adventure/RECEIVE_GAME': {
        draft[action.game.id] = {
          ...action.game,
          updatedAt: new Date().toUTCString(),
        };
        log.info(`Received new game ${action.game.id}`);
        break;
      }

      case 'desert-adventure/RECEIVE_PLAYER': {
        draft[action.gameId].players.push(action.player);
        log.info(
          `Received new player ${action.player.name} for game ${action.gameId}`,
        );
        break;
      }

      case 'desert-adventure/REMOVE_PLAYER': {
        const playerCount = draft[action.gameId].players.length;
        const activeIdx = draft[action.gameId].activePlayer;
        if (playerCount - 1 < MIN_PLAYERS) {
          draft[action.gameId].state = 'inactive';
          log.info(
            `Player count for game ${action.gameId} has fallen below minimum; setting to inactive state`,
          );
        }
        const quitterIdx = findIndex(
          draft[action.gameId].players,
          player => player.name === action.playerName,
        );
        draft[action.gameId].players = draft[action.gameId].players.filter(
          ({ name }) => name !== action.playerName,
        );
        if (quitterIdx === activeIdx && quitterIdx === playerCount - 1) {
          draft[action.gameId].activePlayer = 0;
        } else if (quitterIdx < activeIdx) {
          draft[action.gameId].activePlayer--;
        }
        if (quitterIdx === activeIdx) {
          draft[action.gameId].phase = 'select-direction';
        }
        break;
      }

      case 'desert-adventure/START_GAME': {
        draft[action.gameId].state = 'active';
        log.info(`Game ${action.gameId} set to active state`);
        draft[action.gameId].players = shuffle(draft[action.gameId].players);
        draft[action.gameId].activePlayer = 0;
        break;
      }

      case 'desert-adventure/CLEAR_GAME': {
        delete draft[action.gameId];
        log.info(`Game ${action.gameId} cleared`);
        break;
      }

      case 'desert-adventure/SET_PLAYER_DIRECTION': {
        draft[action.gameId].players.find(
          ({ name }) => name === action.playerName,
        ).returning = action.returning;
        log.info(
          `Set player ${action.playerName} to returning ${action.returning} for game ${action.gameId}`,
        );
        draft[action.gameId].phase = 'roll-dice';
        break;
      }

      case 'desert-adventure/MOVE_PLAYER': {
        const { round, path } = draft[action.gameId];
        const { treasure, returning } = draft[action.gameId].players.find(
          ({ name }) => name === action.playerName,
        );
        const spacesToMove = Math.max(0, action.roll - treasure[round].length);
        const oldPosition = getPlayerPosition(draft, action);
        let newPosition = oldPosition;
        let spacesMoved = 0;
        while (spacesMoved < spacesToMove) {
          newPosition += returning ? -1 : 1;
          if (!isSpaceOccupied(draft, action, newPosition)) {
            spacesMoved += 1;
            continue;
          }
          while (isSpaceOccupied(draft, action, newPosition)) {
            newPosition += returning ? -1 : 1;
          }
          spacesMoved += 1;
        }
        while (
          newPosition >= path.length ||
          isSpaceOccupied(draft, action, newPosition)
        ) {
          newPosition--;
        }
        setPlayerPosition(draft, action, newPosition);
        if (newPosition < 0) {
          log.info(
            `Player ${action.playerName} has made it home; scheduling to start new round`,
          );
          draft = endTurn(draft, action);
          break;
        }
        draft[action.gameId].phase = 'handle-space';
        break;
      }

      case 'desert-adventure/TAKE_TREASURE': {
        const position = getPlayerPosition(draft, action);
        const treasure = draft[action.gameId].path[position];
        draft[action.gameId].players
          .find(player => player.name === action.playerName)
          .treasure[draft[action.gameId].round].push(treasure);
        draft[action.gameId].path[position] = null;
        draft = endTurn(draft, action);
        break;
      }

      case 'desert-adventure/DROP_TREASURE': {
        const position = getPlayerPosition(draft, action);
        const treasures = draft[action.gameId].players.find(
          player => player.name === action.playerName,
        ).treasure[draft[action.gameId].round];
        draft[action.gameId].path[position] = treasures[action.treasureIndex];
        draft[action.gameId].players.find(
          player => player.name === action.playerName,
        ).treasure[draft[action.gameId].round] = treasures
          .slice(0, action.treasureIndex)
          .concat(treasures.slice(action.treasureIndex + 1));
        draft = endTurn(draft, action);
        break;
      }

      case 'desert-adventure/IGNORE_TREASURE': {
        draft = endTurn(draft, action);
        break;
      }

      default:
        break;
    }
    switch (action.type) {
      case 'desert-adventure/RECEIVE_PLAYER':
      case 'desert-adventure/REMOVE_PLAYER':
      case 'desert-adventure/START_GAME':
      case 'desert-adventure/SET_PLAYER_DIRECTION':
      case 'desert-adventure/MOVE_PLAYER':
      case 'desert-adventure/TAKE_TREASURE':
      case 'desert-adventure/DROP_TREASURE':
      case 'desert-adventure/IGNORE_TREASURE':
        log.info(`Setting updated timestamp for game ${action.gameId}`);
        draft[action.gameId].updatedAt = new Date().toUTCString();
        break;
    }
    return draft;
  });
