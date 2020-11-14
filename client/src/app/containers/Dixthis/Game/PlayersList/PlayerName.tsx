import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../../state/selectors';
import { Title } from '../../types';

type Props = {
  name: string;
  title?: Title;
};

export const PlayerName: React.FC<Props> = ({ name, title }) => {
  const player = useSelector(selectPlayer);
  const { t } = useTranslation();
  return (
    <span className="ml-1">
      {title ? t(translations.dixthis.playerTitles[title], { playerName: name }) : name}{' '}
      {name === player?.name && t(translations.dixthis.players.you)}
    </span>
  );
};
