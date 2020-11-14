import * as gameService from './game/service';
import { Router } from 'express';
import { handleGameChanges } from './websocket/handleGameChanges';

handleGameChanges();

export function desertAdventureRoutes(router: Router) {
  router.post('/api/desert-adventure', (req, res) => {
    res.send(gameService.createGame(req.body));
  });

  router.delete('/api/desert-adventure/:id', (req, res) => {
    res.send(gameService.clearGame(req.params.id));
  });

  router.post('/api/desert-adventure/:id/players', (req, res) => {
    res.send(gameService.joinGame(req.params.id, req.body));
  });

  router.delete('/api/desert-adventure/:id/players/:name', (req, res) => {
    res.send(gameService.removePlayer(req.params.id, req.params.name));
  });

  router.get('/api/desert-adventure/:id', (req, res) => {
    res.send(gameService.getGame(req.params.id));
  });

  router.put('/api/desert-adventure/:id', (req, res) => {
    res.send(gameService.startGame(req.params.id));
  });

  router.put(
    '/api/desert-adventure/:id/players/:name/direction',
    (req, res) => {
      res.send(
        gameService.setPlayerDirection(
          req.params.id,
          req.params.name,
          req.body,
        ),
      );
    },
  );

  router.put('/api/desert-adventure/:id/players/:name/position', (req, res) => {
    res.send(gameService.movePlayer(req.params.id, req.params.name, req.body));
  });

  router.put('/api/desert-adventure/:id/players/:name/treasure', (req, res) => {
    res.send(
      gameService.handleTreasure(req.params.id, req.params.name, req.body),
    );
  });
}
