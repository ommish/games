import { Divider } from 'app/components/Divider';
import { translations } from 'locales/i18n';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { GoToGame } from './GoToGame';
import { NewGame } from './NewGame';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="brilliance homepage">
      <div className="bg-brilliance-primary-main text-white p-8 flex flex-col items-center justfiy-center">
        <h1 className="flex text-white">
          <img
            src="/brilliance/logo/image.svg"
            alt="Brilliance"
            className="mr-2"
          />
          {t(translations.brilliance.game.title)}
        </h1>
        <div className="mt-4">
          <Trans i18nKey={translations.brilliance.game.details}>
            A web version of the game
            <a
              href="https://www.daysofwonder.com/online/en/splendor"
              target="_blank"
              rel="noreferrer"
            >
              Splendor
            </a>
            .
          </Trans>
        </div>
      </div>
      <div className="p-8">
        <NewGame />
        <Divider />
        <GoToGame />
      </div>
    </div>
  );
};
