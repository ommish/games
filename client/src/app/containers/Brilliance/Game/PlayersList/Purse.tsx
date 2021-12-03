import React from 'react';
import { TOKEN_TYPES } from '../../constants';
import { TokenPool } from '../../types';
import { Token } from '../components';

type Props = {
  purse: TokenPool;
};

export const Purse: React.FC<Props> = ({ purse }) => {
  return (
    <div className="flex flex-wrap">
      {TOKEN_TYPES.map(
        token =>
          purse[token] > 0 && (
            <Token key={token} token={token} size="s" amount={purse[token]} />
          ),
      )}
    </div>
  );
};
