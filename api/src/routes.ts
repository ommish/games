import { dixthisRoutes } from './dixthis/routes';
import { desertAdventureRoutes } from './desert-adventure/routes';
import { Router } from 'express';
import { brillianceRoutes } from './brilliance/routes';

export function routes(): Router {
  const router = Router();
  dixthisRoutes(router);
  desertAdventureRoutes(router);
  brillianceRoutes(router);
  return router;
}
