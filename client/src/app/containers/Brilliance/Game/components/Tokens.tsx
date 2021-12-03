import React from 'react';
import { TOKEN_TYPES } from '../../constants';
import { tokensToColor } from '../../styles';
import { TokenPool } from '../../types';
import { sumTokens } from '../../utils';
import { Token } from '../components';
import { EmptyState } from './EmptyState';

type Props = { tokens: TokenPool; size?: 's' | 'm' | 'l' };
export const Tokens: React.FC<Props> = ({ tokens, size }) => {
  return sumTokens(tokens) ? (
    <div className="p-2 flex flex-wrap h-min gap-x-2">
      {TOKEN_TYPES.map(
        token =>
          !!tokens[token] && (
            <div
              key={token}
              style={{
                borderColor: tokensToColor(token),
              }}
              className="bg-white border rounded-md p-2 flex h-min my-1"
            >
              {new Array(tokens[token]).fill(null).map((_, i) => (
                <Token key={i} token={token} size={size} />
              ))}
            </div>
          ),
      )}
    </div>
  ) : (
    <EmptyState category="tokens" />
  );
};
