import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectGame } from '../state/selectors';

export const FinishedNotice: React.FC = () => {
  const { t } = useTranslation();
  const game = useSelector(selectGame);
  if (!game) return null;
  return (
    <div
      className="w-full p-6 text-white text-center"
      style={{ background: '#191D32' }}
    >
      <h1 className="text-brilliance-error-main">
        {t(translations.brilliance.finishedGame.title)}
      </h1>
      <div className="my-4">
        {t(translations.brilliance.finishedGame.winnerMessage, {
          winner: game.players.map(({ name }) => name).join(', '),
        })}
      </div>
      <div className="text-brilliance-error-main my-4">
        {t(translations.brilliance.finishedGame.clearMessage)}
      </div>
    </div>
  );
};
