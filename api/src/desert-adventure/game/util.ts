import { Draft } from 'immer';
import { compact, findLastIndex, flattenDeep, shuffle } from 'lodash';
import { CLOSE_WAIT, STARTING_WATER } from '../constants';
import { clearGame } from './service';
import { GameState } from '../types';

export function getPlayerPosition(
  draft: Draft<GameState>,
  { gameId, playerName }: { gameId: string; playerName: string },
): number {
  return draft[gameId].players.find(player => player.name === playerName)
    .position;
}

export function setPlayerPosition(
  draft: Draft<GameState>,
  { gameId, playerName }: { gameId: string; playerName: string },

  position: number,
) {
  draft[gameId].players.find(
    player => player.name === playerName,
  ).position = position;
}

export function isSpaceOccupied(
  draft: Draft<GameState>,
  { gameId, playerName }: { gameId: string; playerName: string },
  position: number,
): boolean {
  return draft[gameId].players.some(
    player => player.position === position && player.name !== playerName,
  );
}

export function endTurn(
  draft: Draft<GameState>,
  { gameId }: { gameId: string },
): Draft<GameState> {
  // If everyone has returned, end the round
  if (
    draft[gameId].players.every(
      ({ returning, position }) => returning && position < 0,
    )
  ) {
    return endRound(draft, { gameId });
  }
  // If water has run out, end turn
  if (draft[gameId].water <= 0) {
    return endRound(draft, { gameId });
  }
  //  If player was last in sequence, loop back to start
  if (draft[gameId].activePlayer === draft[gameId].players.length - 1) {
    draft[gameId].activePlayer = 0;
    // Otherwise next player is up
  } else {
    draft[gameId].activePlayer++;
  }

  // If next user has already returned, end their turn and move to next player
  if (
    draft[gameId].players[draft[gameId].activePlayer].returning &&
    draft[gameId].players[draft[gameId].activePlayer].position < 0
  ) {
    draft = endTurn(draft, { gameId });
  } else {
    // Otherwise subtract water and start next round
    draft[gameId].water =
      draft[gameId].water -
      draft[gameId].players[draft[gameId].activePlayer].treasure[
        draft[gameId].round
      ].length;
  }
  // Reset phase
  draft[gameId].phase = 'select-direction';
  return draft;
}

export function endRound(
  draft: Draft<GameState>,
  { gameId }: { gameId: string },
): Draft<GameState> {
  const { round, rounds, players } = draft[gameId];

  // Place unretreived treasure back into the path
  const starved = shuffle(players.filter(({ position }) => position >= 0));
  starved.forEach(player => {
    if (player.treasure[round].length) {
      draft[gameId].path.push(shuffle(flattenDeep(player.treasure[round])));
      draft[gameId].players.find(({ name }) => name === player.name).treasure[
        round
      ] = [];
    }
  });
  // Collapse empty spaces
  draft[gameId].path = compact(draft[gameId].path);

  // End game if possible
  if (round === rounds) {
    draft[gameId].state = 'over';
    setTimeout(() => {
      clearGame(gameId);
    }, CLOSE_WAIT);
    return draft;
  }

  // Who went the furthest?
  let furthest: { position: number; playerName: string };
  draft[gameId].players.forEach(player => {
    if (!furthest || player.position > furthest.position) {
      furthest = { position: player.position, playerName: player.name };
    }
    // reset positions
    player.position = -1;
    // reset directions
    player.returning = false;
  });
  const firstPlayerIdx = findLastIndex(
    draft[gameId].players,
    ({ name }) => name === furthest.playerName,
  );

  // Deppest player goes first
  draft[gameId].players = draft[gameId].players
    .slice(firstPlayerIdx)
    .concat(draft[gameId].players.slice(0, firstPlayerIdx));
  draft[gameId].activePlayer = 0;

  // Reset phase
  draft[gameId].phase = 'select-direction';

  // Increment round
  draft[gameId].round += 1;

  // Resupply water
  draft[gameId].water = STARTING_WATER;
  return draft;
}
