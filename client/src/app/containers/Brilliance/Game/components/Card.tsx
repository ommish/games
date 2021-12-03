import React from 'react';
import { Card as TCard } from '../../types';
import { Points } from './Points';
import { Token } from './Token';
import { TokenCost } from './TokenCost';

type Props = {
  card: TCard;
  partial?: boolean;
  reserved?: boolean;
};

export const Card: React.FC<Props> = ({ card, partial, reserved }) => {
  let width = '120px';
  let height = partial ? '72px' : '230px';
  if (reserved) {
    [width, height] = [height, width];
  }
  return (
    <div
      style={{
        width,
        height,
        backgroundImage: `url('${card.image}')`,
        backgroundSize: 'cover',
        opacity: reserved ? 0.5 : 1,
      }}
      className="flex flex-col justify-between rounded-md shadow-sm"
    >
      <div className="flex justify-between items-center pl-1">
        <Points points={card.points} />
        <Token token={card.resource} size="m" />
      </div>
      {!partial && <TokenCost cost={card.cost} row={reserved} />}
    </div>
  );
};
