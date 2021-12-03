import * as z from 'zod';
import { VALIDATION } from '../constants';

export const playerName = z
  .string()
  .min(VALIDATION.playerName.minLength)
  .max(VALIDATION.playerName.maxLength);
