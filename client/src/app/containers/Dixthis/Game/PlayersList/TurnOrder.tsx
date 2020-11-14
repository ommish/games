import { translations } from 'locales/i18n';
import React from 'react';
import { ArrowRight } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectOnDeckPlayer, selectPlayers } from '../../state/selectors';
import { PlayerName } from './PlayerName';

export const TurnOrder: React.FC = () => {
  const players = useSelector(selectPlayers);
  const currentIndex = useSelector(selectOnDeckPlayer) || 0;
  const head = players?.slice(currentIndex) || [];
  const tail = players?.slice(0, currentIndex) || [];
  const list = head.concat(tail);
  const { t } = useTranslation();
  return (
    <div>
      <h2 className="text-dixthis-secondary-main">
        {t(translations.dixthis.players.turnOrder)}
      </h2>
      {list.map(({ name }, i) => (
        <span key={name}>
          <PlayerName name={name} />
          {i < list.length - 1 && <ArrowRight className="inline mx-1" />}
        </span>
      ))}
    </div>
  );
};
