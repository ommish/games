import * as service from './game/service';
import { Router } from 'express';
import { handleGameChanges } from './websocket/handleGameChanges';

handleGameChanges();

export function dixthisRoutes(router: Router) {
  router.post('/api/dixthis', (req, res) => {
    res.send(service.createGame(req.body));
  });

  router.delete('/api/dixthis/:id', (req, res) => {
    res.send(service.clearGame(req.params.id));
  });

  router.post('/api/dixthis/:id/players', (req, res) => {
    res.send(service.joinGame(req.params.id, req.body));
  });

  router.delete('/api/dixthis/:id/players/:name', (req, res) => {
    res.send(service.removePlayer(req.params.id, req.params.name));
  });

  router.get('/api/dixthis/:id', (req, res) => {
    res.send(service.getGame(req.params.id));
  });

  router.put('/api/dixthis/:id', (req, res) => {
    res.send(service.startGame(req.params.id));
  });

  router.post('/api/dixthis/:id/players/:name/hint', (req, res) => {
    res.send(service.selectHint(req.params.id, req.params.name, req.body));
  });

  router.post('/api/dixthis/:id/players/:name/card', (req, res) => {
    res.send(service.submitCard(req.params.id, req.params.name, req.body));
  });

  router.post('/api/dixthis/:id/players/:name/guess', (req, res) => {
    res.send(service.guessCard(req.params.id, req.params.name, req.body));
  });
}
