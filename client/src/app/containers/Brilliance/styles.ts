import { colors } from 'styles/theme';
import { Token } from './types';

export const tokensToColor = (resource: Token, alpha = 1): string => {
  switch (resource) {
    case 'chocolate':
      return `rgba(88,62,35, ${alpha})`;
    case 'diamond':
      return `rgba(210,210,200, ${alpha})`;
    case 'ruby':
      return `rgba(171,52,40, ${alpha})`;
    case 'emerald':
      return `rgba(24,85,35, ${alpha})`;
    case 'sapphire':
      return `rgba(43,69,112, ${alpha})`;
    case 'gold':
      return `rgb(255,210,63, ${alpha})`;
  }
};

export const tokenContrastColor = (resource: Token): string => {
  switch (resource) {
    case 'chocolate':
      return `white`;
    case 'diamond':
      return colors.main.grey.dark;
    case 'ruby':
      return `white`;
    case 'emerald':
      return `white`;
    case 'sapphire':
      return `white`;
    case 'gold':
      return colors.main.grey.dark;
  }
};

export const tokenImage = (token: Token): string =>
  `/brilliance/tokens/${token}.svg`;

export const pointsImage = (): string => `/star.svg`;
