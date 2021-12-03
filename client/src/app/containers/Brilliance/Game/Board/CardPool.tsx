import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectGame } from '../../state/selectors';
import { CardLevel } from '../../types';
import { Card, EmptyState } from '../components';

const Levels: CardLevel[] = [3, 2, 1];

export const CardPool: React.FC = () => {
  const game = useSelector(selectGame);
  const { t } = useTranslation();
  if (!game) {
    return null;
  }
  return (
    <>
      {Levels.map(level => (
        <React.Fragment key={level}>
          <div className="text-xl font-semibold">
            {t(translations.brilliance.cards.level, {
              level: level,
              remaining: game.deck[level].length,
            })}
          </div>
          {game.cardPool[level].length ? (
            <div className="flex flex-shrink gap-x-2">
              {game.cardPool[level].map((card, i) => (
                <Card key={i} card={card} />
              ))}
            </div>
          ) : (
            <EmptyState category="cards" />
          )}
        </React.Fragment>
      ))}
    </>
  );
};
