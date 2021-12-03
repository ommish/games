import React from 'react';
import { tokenContrastColor, tokenImage } from '../../styles';
import { Token as TToken } from '../../types';

type Size = 's' | 'm' | 'l';
type Props = {
  token: TToken;
  size?: Size;
  amount?: number;
  reserve?: boolean;
};

const sizes = {
  s: '32px',
  m: '42px',
  l: '52px',
} as const;

export const Token: React.FC<Props> = ({
  token,
  size = 'm',
  amount,
  reserve,
}) => {
  return (
    <div
      style={{
        width: sizes[size],
        height: sizes[size],
        backgroundImage: `url("${tokenImage(token)}")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'none',
        transform: reserve ? 'rotate(90deg)' : '',
        opacity: reserve ? 0.5 : 1,
      }}
      className="flex justify-center items-center"
    >
      {amount && (
        <div
          className="font-semibold text-xl text-center"
          style={{
            color: tokenContrastColor(token),
          }}
        >
          {amount}
        </div>
      )}
    </div>
  );
};
