import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectPlayers } from '../../state/selectors';
import { PlayerToken } from '../Player';

export const Oasis: React.FC = () => {
  const players = useSelector(selectPlayers);
  const { t } = useTranslation();
  if (!players) return null;

  return (
    <div
      className="relative p-2"
      style={{
        height: '160px',
        width: '160px',
        minHeight: '160px',
        minWidth: '160px',
        backgroundImage: `url('/desert-adventure/oasis.svg')`,
        backgroundSize: 'cover',
      }}
    >
      <h1 className="text-desert-primary-main">
        {t(translations.desertAdventure.path.oasis)}
      </h1>
      <div className="flex absolute bottom-0">
        {players
          .filter(({ position }) => position < 0)
          .map(player => (
            <div key={player.name} className="m-1">
              <PlayerToken player={player} />
            </div>
          ))}
      </div>
    </div>
  );
};
