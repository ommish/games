import { translations } from 'locales/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectPlayer, selectSubmittedCards } from '../../../state/selectors';
import { BoardTopper, Card, CardList, Hint } from '../../components';
import { CardListType, ListToggle } from './ListToggle';

export const OtherPlayer: React.FC = () => {
  const cards = useSelector(selectSubmittedCards);
  const player = useSelector(selectPlayer);
  const [listType, setListType] = useState<CardListType>('pool');
  const { t } = useTranslation();
  return (
    <>
      <BoardTopper>
        <div>
          <Hint />
          {player && (
            <h2 className="text-dixthis-secondary-main">
              {t(translations.dixthis.guessingOriginal.activePlayerMessage)}
            </h2>
          )}
        </div>
        {player && <ListToggle listType={listType} setListType={setListType} />}
      </BoardTopper>
      <CardList>
        {listType === 'pool' &&
          cards?.map(({ card }) => <Card key={card} card={card} />)}
        {listType === 'hand' &&
          player?.hand.map(card => <Card key={card} card={card} />)}
      </CardList>
    </>
  );
};
