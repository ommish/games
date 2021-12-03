import React from 'react';
import { useSelector } from 'react-redux';
import { selectGame } from '../../state/selectors';
import { Tokens } from '../components';

export const TokenPool: React.FC = () => {
  const game = useSelector(selectGame);
  if (!game) {
    return null;
  }
  return <Tokens tokens={game.tokenPool} size="m" />;
};
