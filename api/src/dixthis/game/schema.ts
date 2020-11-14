import * as z from 'zod';
import { VALIDATION } from './constants';

export const playerName = z
  .string()
  .min(VALIDATION.playerName.minLength)
  .max(VALIDATION.playerName.maxLength);
export const playerPoints = z
  .number()
  .int()
  .min(VALIDATION.playerPoints.min)
  .max(VALIDATION.playerPoints.max);
export const pointsToWin = z
  .number()
  .int()
  .min(VALIDATION.pointsToWin.min)
  .max(VALIDATION.pointsToWin.max)
  .optional()
  .nullable();
export const hint = z
  .string()
  .min(VALIDATION.hint.minLength)
  .max(VALIDATION.hint.maxLength);
