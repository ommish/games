import React from 'react';
import { TokenPool } from '../../types';
import { keys } from '../../utils';
import { Token } from './Token';

type Props = {
  cost: Partial<TokenPool>;
  row?: boolean;
};

export const TokenCost: React.FC<Props> = ({ cost, row }) => {
  return (
    <div
      className={`bg-whiteAlpha-50 self-start p-1 w-min ${row ? 'flex' : ''}`}
    >
      {keys(cost).map(resource => (
        <Token
          key={resource}
          size="s"
          token={resource}
          amount={cost[resource] as number}
        />
      ))}
    </div>
  );
};
