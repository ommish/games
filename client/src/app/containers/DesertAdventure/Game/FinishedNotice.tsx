import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectGame } from '../state/selectors';
import { totalPoints } from './util';

export const FinishedNotice: React.FC = () => {
  const { t } = useTranslation();
  const game = useSelector(selectGame);
  if (!game) return null;
  const points = game.players.map(player => totalPoints(player));
  const max = Math.max(...points);
  return (
    <div
      className="w-full p-6 text-white text-center"
      style={{ background: '#191D32' }}
    >
      <h1 className="text-desert-error-main">
        {t(translations.desertAdventure.finishedGame.title)}
      </h1>
      <div className="my-4">
        {t(translations.desertAdventure.finishedGame.winnerMessage, {
          winner: game.players
            .filter((player, i) => points[i] === max)
            .map(({ name }) => name)
            .join(', '),
        })}
      </div>
      <div className="text-desert-error-main my-4">
        {t(translations.desertAdventure.finishedGame.clearMessage)}
      </div>
    </div>
  );
};
