import React from 'react';
import { useSelector } from 'react-redux';
import { selectGame } from '../../state/selectors';
import { EmptyState, Noble } from '../components';

export const NoblePool: React.FC = () => {
  const game = useSelector(selectGame);
  if (!game) {
    return null;
  }
  return game.noblePool.length ? (
    <div className="flex flex-wrap gap-x-2">
      {game.noblePool.map((noble, i) => (
        <div key={i}>
          <Noble noble={noble} />
        </div>
      ))}
    </div>
  ) : (
    <EmptyState category="nobles" />
  );
};
