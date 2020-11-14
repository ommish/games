import { dixthisRoutes } from './dixthis/routes';
import { desertAdventureRoutes } from './desert-adventure/routes';
import { Router } from 'express';

export function routes(): Router {
  const router = Router();
  dixthisRoutes(router);
  desertAdventureRoutes(router);
  return router;
}
