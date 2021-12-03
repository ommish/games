import { random } from 'lodash';
import produce from 'immer';
import { findIndex, shuffle } from 'lodash';
import { GameState, Noble } from '../../types';
import { TOKEN_TYPES } from '../../constants';
import {
  drawCard,
  getCurrentPlayer,
  getNextPlayer,
  keys,
  startingTokenPool,
  transferTokensFromPool,
} from '../../utils';
import { GameAction } from './actions';
import { getLogger } from '../../../util/logger';
import { NOBLES } from '../../fixtures';

const log = getLogger('game.reducer');

export const GameReducer = (state: GameState = {}, action: GameAction) =>
  produce(state, draft => {
    switch (action.type) {
      case 'brilliance/RECEIVE_PLAYER':
      case 'brilliance/REMOVE_PLAYER':
      case 'brilliance/START_GAME':
      case 'brilliance/CLEAR_GAME':
      case 'brilliance/START_TURN':
      case 'brilliance/END_GAME':
      case 'brilliance/TAKE_TOKENS':
      case 'brilliance/PURCHASE_CARD':
      case 'brilliance/RESERVE_CARD':
        log.info(`Setting updated timestamp for game ${action.gameId}`);
        draft[action.gameId].updatedAt = new Date().toUTCString();
        break;
    }

    switch (action.type) {
      case 'brilliance/RECEIVE_GAME': {
        draft[action.game.id] = {
          ...action.game,
          tokenPool: startingTokenPool(2),
          updatedAt: new Date().toUTCString(),
        };
        log.info(`Received new game ${action.game.id}`);
        return draft;
      }

      case 'brilliance/RECEIVE_PLAYER': {
        const game = draft[action.gameId];
        game.players.push(action.player);
        game.tokenPool = startingTokenPool(game.players.length);
        game.noblePool = randomNobles(game.players.length);
        log.info(
          `Received new player ${action.player.name} for game ${action.gameId}`,
        );
        return draft;
      }

      case 'brilliance/REMOVE_PLAYER': {
        const game = draft[action.gameId];
        game.players = game.players.filter(
          ({ name }) => name !== action.playerName,
        );
        game.tokenPool = startingTokenPool(game.players.length);
        game.noblePool = randomNobles(game.players.length);
        return draft;
      }

      case 'brilliance/START_GAME': {
        const game = draft[action.gameId];
        game.state = 'active';
        game.players = shuffle(game.players);
        log.info(`Game ${action.gameId} set to active state`);
        return draft;
      }

      case 'brilliance/CLEAR_GAME': {
        delete draft[action.gameId];
        log.info(`Game ${action.gameId} cleared`);
        return draft;
      }

      case 'brilliance/TAKE_TOKENS': {
        const game = draft[action.gameId];
        TOKEN_TYPES.forEach(token => {
          if (action.draw[token]) {
            transferTokensFromPool(game, token, action.draw[token]);
          }
          if (action.discard[token]) {
            transferTokensFromPool(game, token, -action.discard[token]);
          }
        });
        return draft;
      }

      case 'brilliance/PURCHASE_CARD': {
        const game = draft[action.gameId];
        const player = getCurrentPlayer(game);
        keys(action.tokens).forEach(token => {
          transferTokensFromPool(game, token, -action.tokens[token]);
        });
        drawCard(game, 'hand', action.source, action.index);
        const boughtNobleIndex = findIndex(game.noblePool, noble =>
          TOKEN_TYPES.every(
            token =>
              !noble.cost[token] ||
              player.hand.filter(card => card.resource === token).length >=
                noble.cost[token],
          ),
        );
        if (boughtNobleIndex >= 0) {
          player.nobles.push(game.noblePool.splice(boughtNobleIndex, 1)[0]);
        }
        return draft;
      }

      case 'brilliance/RESERVE_CARD': {
        const game = draft[action.gameId];
        const player = getCurrentPlayer(game);
        transferTokensFromPool(game, 'gold', 1);
        if (action.discard) {
          transferTokensFromPool(game, action.discard, -1);
        }
        drawCard(game, 'reserve', action.level, action.index);
        return draft;
      }

      case 'brilliance/START_TURN': {
        const nextPlayer = getNextPlayer(
          draft[action.gameId],
          draft[action.gameId].currentPlayer,
        );
        draft[action.gameId].currentPlayer = nextPlayer
          ? draft[action.gameId].currentPlayer + 1
          : 0;
        return draft;
      }
      case 'brilliance/END_GAME': {
        draft[action.gameId].state = 'over';
        return draft;
      }
      default:
        return draft;
    }
  });

export function randomNobles(playerCount: number): Noble[] {
  return shuffle(NOBLES).slice(0, playerCount + 1);
}
