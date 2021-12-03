import React from 'react';
import { useSelector } from 'react-redux';
import { selectGame } from '../../state/selectors';
import { ActionProvider } from './ActionContext';
import { CardPool } from './CardPool';
import { NoblePool } from './NoblePool';
import { TokenPool } from './TokenPool';
import { TurnTaker } from './TurnTaker';

export const Board: React.FC = () => {
  const game = useSelector(selectGame);
  if (!game) {
    return null;
  }
  return (
    <ActionProvider>
      <div className="h-full overflow-y-auto">
        <TurnTaker />
        <div className="h-full bg-brilliance-primary-extraLight grid grid-cols-1 md:grid-cols-3 xl:grid-cols-2">
          <div className="col-span-1 md:col-span-2 xl:col-span-1 row-span-2 flex flex-col items-center">
            <CardPool />
          </div>
          <TokenPool />
          <NoblePool />
        </div>
      </div>
    </ActionProvider>
  );
};
