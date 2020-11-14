import { random } from 'lodash';
import produce from 'immer';
import { findIndex, shuffle } from 'lodash';
import { GameState } from '../../types';
import { HAND_SIZE, MIN_PLAYERS, ROUND_WAIT } from '../constants';
import { getFirstPlayer, getNextPlayer } from './selectors';
import { GameAction } from './actions';
import { clearGame, startRound } from '../service';
import { getLogger } from '../../../util/logger';

const log = getLogger('game.reducer');

export const GameReducer = (state: GameState = {}, action: GameAction) =>
  produce(state, draft => {
    switch (action.type) {
      case 'dixthis/RECEIVE_PLAYER':
      case 'dixthis/REMOVE_PLAYER':
      case 'dixthis/START_GAME':
      case 'dixthis/CLEAR_GAME':
      case 'dixthis/PICK_WORD':
      case 'dixthis/SUBMIT_CARD':
      case 'dixthis/GUESS_CARD':
      case 'dixthis/START_ROUND':
        log.info(`Setting updated timestamp for game ${action.gameId}`);
        draft[action.gameId].updatedAt = new Date().toUTCString();
        break;
    }
    switch (action.type) {
      case 'dixthis/RECEIVE_GAME': {
        draft[action.game.id] = {
          ...action.game,
          updatedAt: new Date().toUTCString(),
        };
        log.info(`Received new game ${action.game.id}`);
        return draft;
      }

      case 'dixthis/RECEIVE_PLAYER': {
        for (let i = 0; i < HAND_SIZE; i++) {
          action.player.hand.push(draft[action.gameId].deck.pop());
        }
        draft[action.gameId].players.push(action.player);
        log.info(
          `Received new player ${action.player.name} for game ${action.gameId}`,
        );
        return draft;
      }

      case 'dixthis/REMOVE_PLAYER': {
        if (draft[action.gameId].players.length - 1 < MIN_PLAYERS) {
          draft[action.gameId].nextRoundAt = null;
          draft[action.gameId].state = 'inactive';
          log.info(
            `Player count for game ${action.gameId} has fallen below minimum; setting to inactive state`,
          );
        }
        if (
          draft[action.gameId].phase === 'selecting-hint' &&
          draft[action.gameId].onDeck.name === action.playerName
        ) {
          const idx = findIndex(
            draft[action.gameId].players,
            player => player.name === action.playerName,
          );
          const nextPlayer = getNextPlayer(draft[action.gameId], idx);
          const firstPlayer = getFirstPlayer(draft[action.gameId]);
          draft[action.gameId].onDeck = {
            name: (nextPlayer || firstPlayer).name,
            index: nextPlayer ? idx + 1 : 0,
          };
          log.info(
            `Player ${action.playerName} to be removed from game ${
              action.gameId
            } was the deck player; shifted to ${
              draft[action.gameId].onDeck.name
            }`,
          );
        }
        draft[action.gameId].players = draft[action.gameId].players.filter(
          ({ name }) => name !== action.playerName,
        );
        return draft;
      }

      case 'dixthis/START_GAME': {
        draft[action.gameId].state = 'active';
        log.info(`Game ${action.gameId} set to active state`);
        const firstPlayerIdx = random(
          0,
          draft[action.gameId].players.length - 1,
        );
        draft[action.gameId].onDeck = {
          name: draft[action.gameId].players[firstPlayerIdx].name,
          index: firstPlayerIdx,
        };
        return draft;
      }

      case 'dixthis/CLEAR_GAME': {
        delete draft[action.gameId];
        log.info(`Game ${action.gameId} cleared`);
        return draft;
      }

      case 'dixthis/PICK_WORD': {
        draft[action.gameId].hint = action.hint;
        draft[action.gameId].players.find(
          ({ name }) => name === action.playerName,
        ).hand = draft[action.gameId].players
          .find(({ name }) => name === action.playerName)
          .hand.filter(card => card !== action.card);
        draft[action.gameId].pool.push({
          card: action.card,
          player: action.playerName,
          original: true,
        });
        log.info(
          `Hint and original card added to pool for game ${action.gameId}`,
        );

        if (draft[action.gameId].deck.length > 0) {
          draft[action.gameId].players
            .find(({ name }) => name === action.playerName)
            .hand.push(draft[action.gameId].deck.pop());
          log.info(
            `Card drawn for player after submitting original card for game ${action.gameId}`,
          );
        }
        draft[action.gameId].phase = 'submitting-cards';
        log.info(`Phase set to submitting-cards for game ${action.gameId}`);
        return draft;
      }

      case 'dixthis/SUBMIT_CARD': {
        draft[action.gameId].players.find(
          ({ name }) => name === action.playerName,
        ).hand = draft[action.gameId].players
          .find(({ name }) => name === action.playerName)
          .hand.filter(card => card !== action.card);

        draft[action.gameId].pool.push({
          card: action.card,
          player: action.playerName,
        });
        draft[action.gameId].pool = shuffle(draft[action.gameId].pool);
        log.info(
          `Card submitted by player ${action.playerName} for game ${action.gameId}`,
        );

        if (draft[action.gameId].deck.length > 0) {
          draft[action.gameId].players
            .find(({ name }) => name === action.playerName)
            .hand.push(draft[action.gameId].deck.pop());
          log.info(
            `Card drawn for player ${action.playerName} for game ${action.gameId}`,
          );
        }
        if (
          draft[action.gameId].players.every(({ name }) =>
            draft[action.gameId].pool.find(({ player }) => name === player),
          )
        ) {
          draft[action.gameId].phase = 'guessing-original';
          log.info(`Phase set to guessing-original for game ${action.gameId}`);
        }
        return draft;
      }

      case 'dixthis/GUESS_CARD': {
        draft[action.gameId].guesses.push({
          card: action.card,
          player: action.playerName,
        });
        log.info(
          `Received guess for player ${action.playerName} of game ${action.gameId}`,
        );
        const originalCard = draft[action.gameId].pool.find(
          ({ original }) => original,
        );
        if (
          !draft[action.gameId].players
            .filter(({ name }) => name !== originalCard.player)
            .every(({ name }) =>
              draft[action.gameId].guesses.find(
                ({ player }) => name === player,
              ),
            )
        ) {
          // Still waiting on guesses
          log.info(`Waiting for more guesses for game ${action.gameId}`);
          return draft;
        }
        draft[action.gameId].phase = 'distributing-points';
        // No one guessed correctly
        // Everyone guessed correctly
        if (
          draft[action.gameId].guesses.every(
            ({ card }) => card === originalCard.card,
          ) ||
          draft[action.gameId].guesses.every(
            ({ card }) => card !== originalCard.card,
          )
        ) {
          draft[action.gameId].players.forEach(player => {
            if (player.name !== originalCard.player) {
              player.points += 2;
            }
          });
        } else {
          const originalPlayer = draft[action.gameId].players.find(
            ({ name }) => name === originalCard.player,
          );
          if (originalPlayer) {
            originalPlayer.points += 3;
          }
        }

        // Correct guesses
        if (
          !draft[action.gameId].guesses.every(
            ({ card }) => card === originalCard.card,
          )
        ) {
          draft[action.gameId].guesses
            .filter(({ card }) => card === originalCard.card)
            .forEach(guess => {
              const player = draft[action.gameId].players.find(
                ({ name }) => name === guess.player,
              );
              if (player) player.points += 3;
            });
        }
        // Wrong guesses
        draft[action.gameId].guesses
          .filter(({ card }) => card !== originalCard.card)
          .forEach(guess => {
            const card = draft[action.gameId].pool.find(
              ({ card }) => card === guess.card,
            );
            const player = draft[action.gameId].players.find(
              ({ name }) => name === card.player,
            );
            if (player) player.points += 1;
          });

        if (
          draft[action.gameId].players.some(
            ({ hand }) => hand.length < HAND_SIZE,
          ) ||
          (draft[action.gameId].pointsToWin &&
            draft[action.gameId].players.some(
              ({ points }) => points >= draft[action.gameId].pointsToWin,
            ))
        ) {
          draft[action.gameId].nextRoundAt = null;
          draft[action.gameId].state = 'over';
          log.info(`Game ${action.gameId} ended`);
          setTimeout(() => {
            clearGame(action.gameId);
          }, ROUND_WAIT);
        } else {
          draft[action.gameId].nextRoundAt = Date.now() + ROUND_WAIT;
          log.info(`Scheduling new round to start for game ${action.gameId}`);
          setTimeout(() => {
            startRound(action.gameId);
          }, ROUND_WAIT);
        }
        return draft;
      }

      case 'dixthis/START_ROUND': {
        log.info(`Scheduling new round to start for game ${action.gameId}`);
        draft[action.gameId].phase = 'selecting-hint';
        const nextPlayer = getNextPlayer(
          draft[action.gameId],
          draft[action.gameId].onDeck.index,
        );
        const firstPlayer = getFirstPlayer(draft[action.gameId]);
        draft[action.gameId].onDeck = {
          name: nextPlayer ? nextPlayer.name : firstPlayer.name,
          index: nextPlayer ? draft[action.gameId].onDeck.index + 1 : 0,
        };
        draft[action.gameId].hint = null;
        draft[action.gameId].pool = [];
        draft[action.gameId].guesses = [];
        log.info(`Scheduling new round to start for game ${action.gameId}`);
        return draft;
      }
      default:
        return draft;
    }
  });
