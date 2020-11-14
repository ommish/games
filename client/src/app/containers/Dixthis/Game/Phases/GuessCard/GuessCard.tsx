import React from 'react';
import { useSelector } from 'react-redux';
import { selectPlayer, selectPlayerMayGuess } from '../../../state/selectors';
import { GuessingPlayer } from './GuessingPlayer';
import { OtherPlayer } from './OtherPlayer';

export const GuessCard: React.FC = () => {
  const mayGuess = useSelector(selectPlayerMayGuess);
  const player = useSelector(selectPlayer);
  return player && mayGuess ? <GuessingPlayer /> : <OtherPlayer />;
};
