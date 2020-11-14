import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectActivePlayer, selectPlayer } from '../../../state/selectors';
import { BoardTopper, Card, CardList } from '../../components';

export const OtherPlayer: React.FC = () => {
  const player = useSelector(selectPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  const { t } = useTranslation();
  return (
    <>
      <BoardTopper>
        <h1 className="text-dixthis-primary-main">
          {t(translations.dixthis.selectingHint.otherPlayerTitle, {
            playerName: activePlayer || '?',
          })}
        </h1>
      </BoardTopper>
      <CardList>
        {player?.hand.map(card => (
          <Card key={card} card={card} />
        ))}
      </CardList>
    </>
  );
};
