import React from 'react';
import { CheckCircle, ThreeDots } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';
import { selectGame } from '../../state/selectors';

const className = 'text-dixthis-grey-light ml-2';
const waiting = <ThreeDots className={className} />;
const ready = <CheckCircle className={className} />;

type Props = { playerName: string };
export const PlayerStatus: React.FC<Props> = props => {
  const game = useSelector(selectGame);
  if (game?.state !== 'active') return null;
  switch (game?.phase) {
    case 'selecting-hint':
      if (game.onDeck.name === props.playerName) {
        return waiting;
      }
      break;
    case 'submitting-cards':
      return game.pool.find(card => card.player === props.playerName)
        ? ready
        : waiting;
    case 'guessing-original':
      return game.guesses.find(guess => guess.player === props.playerName)
        ? ready
        : game.pool.find(
            card => card.original && card.player === props.playerName,
          )
        ? null
        : waiting;
    default:
      return null;
  }
  return null;
};
