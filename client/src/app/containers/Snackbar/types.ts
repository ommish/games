import { ReactNode } from 'react';
import { Color, GameName } from 'types';

export type SnackbarState = {
  isOpen: boolean;
  className?: Color;
  gameName?: GameName | null;
  message?: ReactNode;
};
