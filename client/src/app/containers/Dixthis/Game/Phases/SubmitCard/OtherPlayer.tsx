import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectPlayer } from '../../../state/selectors';
import { BoardTopper, Card, CardList, Hint } from '../../components';

export const OtherPlayer: React.FC = () => {
  const player = useSelector(selectPlayer);
  const { t } = useTranslation();
  return (
    <>
      <BoardTopper>
        <div>
          <Hint />
          <h2 className="text-dixthis-secondary-main">
            {t(translations.dixthis.submittingCards.otherPlayersTitle)}
          </h2>
        </div>
      </BoardTopper>
      <CardList>
        {player?.hand.map(card => (
          <Card key={card} card={card} />
        ))}
      </CardList>
    </>
  );
};
