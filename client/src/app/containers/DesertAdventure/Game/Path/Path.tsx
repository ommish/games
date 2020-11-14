import { useOnResize } from 'app/hooks';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectGame } from '../../state/selectors';
import { Oasis } from './Oasis';
import { Row } from './Row';

const getRowLength = () => Math.floor((window.innerWidth - 64) / 156);

export const Path: React.FC = () => {
  const game = useSelector(selectGame);
  const [rowLength, setRowLength] = useState(getRowLength());
  useOnResize(() => setRowLength(getRowLength()));
  if (!game) return null;
  const rowCount = Math.ceil(game.path.length / rowLength);
  return (
    <>
      <Oasis />
      {new Array(rowCount).fill(null).map((r, row) => (
        <Row key={row} rowLength={rowLength} rowCount={rowCount} row={row} />
      ))}
    </>
  );
};
