import React, { EventHandler, MouseEvent } from 'react';
import { bg, border, text } from 'styles/util';
import { GameName } from 'types';

type Variant = 'primary' | 'outlined' | 'grey' | 'dangerous';
type Size = 'small' | 'medium' | 'large';

type Props = {
  type?: 'button' | 'submit';
  onClick?: EventHandler<MouseEvent>;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  className?: string;
  gameName: GameName;
};

const buildClassName = (
  variant: Variant,
  size: Size,
  className = '',
  gameName: GameName | null = null,
) => {
  const classNames: string[] = [
    'inline-flex',
    'items-center',
    'rounded',
    'px-2',
    'leading-4',
    className,
  ];
  switch (variant) {
    case 'primary':
      classNames.push(bg(gameName, 'primary', 'main'), 'text-white');
      break;
    case 'outlined':
      classNames.push(
        'border',
        border(gameName, 'primary', 'main'),
        text(gameName, 'primary', 'main'),
        'bg-white',
      );
      break;
    case 'grey':
      classNames.push(
        'bg-white',
        'border',
        border(gameName, 'grey', 'light'),
        text(gameName, 'grey', 'light'),
      );
      break;
    case 'dangerous':
      classNames.push(
        'bg-white',
        'border',
        border(gameName, 'error', 'dark'),
        text(gameName, 'error', 'dark'),
      );
      break;
  }
  switch (size) {
    case 'small':
      classNames.push('py-1', 'text-xs');
      break;
    case 'medium':
      classNames.push('py-2', 'text-base');
      break;
    case 'large':
      classNames.push('py-2', 'text-xl');
      break;
  }
  return classNames.join(' ');
};

export const Button: React.FC<Props> = ({
  type = 'button',
  onClick,
  variant = 'primary',
  size = 'medium',
  className = '',
  gameName = null,
  disabled,
  children,
}) => (
  <button
    type={type}
    onClick={onClick}
    className={buildClassName(variant, size, className, gameName)}
    disabled={disabled}
  >
    {children}
  </button>
);
