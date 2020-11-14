import React from 'react';
import { ChevronDown, ChevronLeft, ChevronRight } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { selectGame, selectPlayers } from '../../state/selectors';
import { Space } from './Space';

type Props = {
  row: number;
  rowLength: number;
  rowCount: number;
};
export const Row: React.FC<Props> = ({ row, rowLength, rowCount }) => {
  const game = useSelector(selectGame);
  const players = useSelector(selectPlayers);
  if (!game || !players) return null;
  const playersByPosition = players.reduce(
    (acc, p) => ({ ...acc, [p.position]: p }),
    {},
  );
  const rowItems = game.path.slice(
    row * rowLength,
    row * rowLength + rowLength,
  );
  return (
    <div className={`flex ${row % 2 === 0 ? '' : 'flex-row-reverse'}`}>
      {rowItems.map((space, spaceIdx) => (
        <React.Fragment key={spaceIdx}>
          <Space
            treasures={space}
            player={playersByPosition[row * rowLength + spaceIdx]}
            row={row}
          />
          {row + 1 === rowCount &&
          spaceIdx + 1 === rowItems.length ? null : spaceIdx + 1 ===
            rowLength ? (
            <ChevronDown className="mt-24 text-2xl text-desert-grey-extraLight" />
          ) : row % 2 === 0 ? (
            <ChevronRight className="mt-8 text-2xl text-desert-grey-extraLight" />
          ) : (
            <ChevronLeft className="mt-8 text-2xl text-desert-grey-extraLight" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};
