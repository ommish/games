import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const GameList: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="homepage h-full">
      <div className="flex flex-col items-center justify-center bg-primary-main text-white text-center p-8">
        <h1 className="text-white">{t(translations.game.welcomeTitle)}</h1>
        <div className="my-2">{t(translations.game.welcomeMessage)}</div>
      </div>
      <ul className="font-semibold text-center p-8">
        <li>
          <Link to="/dixthis">{t(translations.dixthis.game.title)}</Link>
        </li>
        <li>
          <Link to="/desert-adventure">
            {t(translations.desertAdventure.game.title)}
          </Link>
        </li>
        <li>
          <Link to="/brilliance">{t(translations.brilliance.game.title)}</Link>
        </li>
      </ul>
    </div>
  );
};
