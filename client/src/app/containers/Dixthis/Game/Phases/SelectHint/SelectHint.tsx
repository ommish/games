import React from 'react';
import { useSelector } from 'react-redux';
import { selectActivePlayer, selectPlayer } from '../../../state/selectors';
import { ActivePlayer } from './ActivePlayer';
import { OtherPlayer } from './OtherPlayer';

export const SelectHint: React.FC = () => {
  const player = useSelector(selectPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  return activePlayer && player?.name === activePlayer ? (
    <ActivePlayer />
  ) : (
    <OtherPlayer />
  );
};
