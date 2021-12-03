import * as z from 'zod';
import { VALIDATION } from '../constants';

export const playerName = z
  .string()
  .min(VALIDATION.playerName.minLength)
  .max(VALIDATION.playerName.maxLength);
export const rounds = z
  .number()
  .int()
  .min(VALIDATION.rounds.min)
  .max(VALIDATION.rounds.max);
export const roll = z
  .number()
  .int()
  .min(VALIDATION.roll.min)
  .max(VALIDATION.roll.max);
export const treasureIndex = (max: number) => z.number().int().min(0).max(max);
