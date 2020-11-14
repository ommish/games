import React from 'react';
import { Player, Treasure as TTreasure } from '../../types';
import { Treasure } from '../components';
import { PlayerToken } from '../Player';

type Props = {
  treasures: TTreasure[] | null;
  player: Player | undefined;
  row: number;
};

export const Space: React.FC<Props> = props => {
  return (
    <div
      className="m-4 flex flex-col items-center border-b-2"
      style={{
        width: '120px',
      }}
    >
      <div className="flex flex-wrap items-center">
        {props.treasures ? (
          props.treasures.map((treasure, i) => (
            <Treasure
              key={i}
              treasure={treasure}
              count={props.treasures?.length || 1}
            />
          ))
        ) : (
          <Treasure treasure={null} count={1} />
        )}
      </div>
      <div className="flex items-end" style={{ height: '60px' }}>
        {props.player && <PlayerToken row={props.row} player={props.player} />}
      </div>
    </div>
  );
};
