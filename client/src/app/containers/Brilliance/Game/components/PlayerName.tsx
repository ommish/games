import { translations } from 'locales/i18n';
import React from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  selectActivePlayer,
  selectGame,
  selectPlayer,
} from '../../state/selectors';
import { Player } from '../../types';

type Props = {
  player: Player;
};
export const PlayerName: React.FC<Props> = ({ player }) => {
  const game = useSelector(selectGame);
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectPlayer);
  const { t } = useTranslation();
  return (
    <h3 className="text-brilliance-secondary-main mr-4 flex items-center">
      {player.name}{' '}
      {player.name === user?.name ? t(translations.brilliance.players.you) : ''}
      {game?.state === 'active' && activePlayer?.name === player.name && (
        <ThreeDots className="ml-2" />
      )}
    </h3>
  );
};
