import React from 'react';
import { Noble as TNoble } from '../../types';
import { Points } from './Points';
import { TokenCost } from './TokenCost';

type Props = {
  noble: TNoble;
};
export const Noble: React.FC<Props> = ({ noble }) => {
  return (
    <div
      style={{
        width: '180px',
        height: '180px',
        backgroundImage: `url('${noble.image}')`,
        backgroundSize: 'cover',
      }}
      className="flex flex-col items-start justify-between h-full border rounded shadow my-1"
    >
      <div className="text-3xl font-semibold self-end mr-2">
        <Points points={noble.points} />
      </div>
      <TokenCost cost={noble.cost} />
    </div>
  );
};
