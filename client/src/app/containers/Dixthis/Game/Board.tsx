import React from 'react';
import { useSelector } from 'react-redux';
import { selectGamePhase } from '../state/selectors';
import { GuessCard, Reveal, SelectHint, SubmitCard } from './Phases';

export const Board: React.FC = () => {
  const phase = useSelector(selectGamePhase);
  switch (phase) {
    case 'selecting-hint':
      return <SelectHint />;
    case 'submitting-cards':
      return <SubmitCard />;
    case 'guessing-original':
      return <GuessCard />;
    case 'distributing-points':
      return <Reveal />;
    default:
      throw new Error(`Invalid game phase ${phase}`);
  }
};
