import React from 'react';
import { useSelector } from 'react-redux';
import { selectActivePlayer, selectPlayer } from '../../../state/selectors';
import { OtherPlayer } from './OtherPlayer';
import { SubmittingPlayer } from './SubmittingPlayer';

export const SubmitCard: React.FC = () => {
  const player = useSelector(selectPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  return player && activePlayer !== player.name ? (
    <SubmittingPlayer />
  ) : (
    <OtherPlayer />
  );
};
