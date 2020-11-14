import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import cors from 'cors';
import * as http from 'http';
import * as WebSocket from 'ws';
import { Socket } from 'net';
import { addWebsocketHanders } from './websocket';
import logRequests from './middleware/logRequests';
import handleError from './middleware/handleError';
import { routes } from './routes';
import { handleGameChanges } from './dixthis/websocket/handleGameChanges';

const app = express();

try {
  app.use(bodyParser.json());

  if (process.env.NODE_ENV !== 'production') {
    app.use(
      cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
      }),
    );
  }

  app.use(logRequests());

  app.use(routes());

  app.use(handleError);

  handleGameChanges();

  if (process.env.NODE_ENV === 'production') {
    app.use(
      express.static(path.resolve(__dirname, '..', '..', 'client', 'build')),
    );
    app.get('*', (req, res) => {
      res.sendFile(
        path.resolve(__dirname, '..', '..', 'client', 'build', 'index.html'),
      );
    });
  }

  const server = app.listen(process.env.PORT, () => {
    console.info(`Server started at port ${process.env.PORT}`);
  });

  const wss = new WebSocket.Server({ noServer: true });
  addWebsocketHanders(wss);

  server.on(
    'upgrade',
    (request: http.IncomingMessage, socket: Socket, head) => {
      console.log('handling server upgrade');
      wss.handleUpgrade(request, socket, head, socket => {
        wss.emit('connection', socket, request);
      });
    },
  );
} catch (err) {
  console.error(`Failed to initialize application: ${err.stack}`);
}
