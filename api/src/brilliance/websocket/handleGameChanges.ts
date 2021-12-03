import { store } from '../../state/store';
import { selectGameSockerServers } from './state/selectors';
import { selectGame } from '../game/state/selectors';
import { isEqual } from 'lodash';
import { clearGame } from '../game/service';

export function handleGameChanges() {
  let currentValue;
  store.subscribe(() => {
    let previousValue = currentValue;
    currentValue = store.getState().brilliance.games;
    if (!previousValue) return;
    Object.keys(previousValue).forEach(gameId => {
      console.log('Checking if any changes in game', gameId);
      if (!isEqual(previousValue[gameId], currentValue[gameId])) {
        console.log('Game changes detected');
        const sockets = selectGameSockerServers(gameId);
        if (sockets) {
          sockets.forEach(socket => {
            console.log('Web socket found, sending message');
            const game = selectGame(gameId);
            socket.send(game ? JSON.stringify(game) : '');
          });
        }
      } else {
        const game = currentValue[gameId];
        if (Date.now() - new Date(game.updatedAt).getTime() > 1800000) {
          // Clear game after 30 minutes of inactivity
          clearGame(gameId);
        }
      }
    });
  });
}
