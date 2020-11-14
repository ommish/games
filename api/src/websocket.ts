import { IncomingMessage } from 'http';
import WebSocket from 'ws';
import { selectGame as selectDixthis } from './dixthis/game/state/selectors';
import { selectGame as selectDesertAdventure } from './desert-adventure/game/state/selectors';
import { store } from './state/store';
import { getGameId } from './util/getGameId';
import { getLogger } from './util/logger';
import { receiveSocket as receiveDixthisSocket } from './dixthis/websocket/state/actions';
import { receiveSocket as receiveDesertAdventureSocket } from './desert-adventure/websocket/state/actions';

const log = getLogger('socket.service');

export function addWebsocketHanders(wss: WebSocket.Server) {
  function heartbeat() {
    this.isAlive = true;
  }

  wss.on('connection', function onConnection(
    socket: WebSocket,
    request: IncomingMessage,
  ) {
    const [gameName, gameId] = getGameId(request);
    log.info(`Handling new connection for ${gameName} game ${gameId}`);
    const game =
      gameName === 'dixthis'
        ? selectDixthis(gameId)
        : selectDesertAdventure(gameId);

    if (!game) {
      log.info(`${gameName} game ${gameId} not found; closing connection`);
      socket.close();
      return;
    }
    store.dispatch(
      gameName === 'dixthis'
        ? receiveDixthisSocket(gameId, socket)
        : receiveDesertAdventureSocket(gameId, socket),
    );
    socket.send(JSON.stringify(game));
    socket.on('pong', heartbeat);
    socket.pong();
  });

  const checkHearbeat = setInterval(function ping() {
    wss.clients.forEach(function each(ws) {
      if (ws['isAlive'] === false) {
        log.info('Terminating dead connection');
        return ws.terminate();
      }
      ws['isAlive'] = false;
      ws.ping(() => {});
    });
  }, 30000);

  wss.on('close', function onClose() {
    log.info(`Connection closed`);
    clearInterval(checkHearbeat);
  });
}
