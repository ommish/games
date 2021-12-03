import * as gameService from './game/service';
import { Router } from 'express';
import { handleGameChanges } from './websocket/handleGameChanges';

handleGameChanges();

export function brillianceRoutes(router: Router) {
  router.post('/api/brilliance', (req, res) => {
    res.send(gameService.createGame(req.body));
  });

  router.delete('/api/brilliance/:id', (req, res) => {
    res.send(gameService.clearGame(req.params.id));
  });

  router.post('/api/brilliance/:id/players', (req, res) => {
    res.send(gameService.joinGame(req.params.id, req.body));
  });

  router.delete('/api/brilliance/:id/players/:name', (req, res) => {
    res.send(gameService.removePlayer(req.params.id, req.params.name));
  });

  router.get('/api/brilliance/:id', (req, res) => {
    res.send(gameService.getGame(req.params.id));
  });

  router.put('/api/brilliance/:id', (req, res) => {
    res.send(gameService.startGame(req.params.id));
  });

  router.post('/api/brilliance/:id/players/:name/turn', (req, res) => {
    res.send(gameService.takeTurn(req.params.id, req.params.name, req.body));
  });
}
