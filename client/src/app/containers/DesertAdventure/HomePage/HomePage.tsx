import { Divider } from 'app/components/Divider';
import { translations } from 'locales/i18n';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { GoToGame } from './GoToGame';
import { NewGame } from './NewGame';

export const HomePage: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="desert homepage">
      <div className="bg-desert-primary-main text-white p-8 flex flex-col items-center justfiy-center">
        <h1 className="flex text-white">
          <img
            src="/desert-adventure/level-3.svg"
            alt="Desert Adventure"
            className="mr-2 w-8"
          />
          {t(translations.desertAdventure.game.title)}
        </h1>
        <div className="mt-4">
          <Trans i18nKey={translations.desertAdventure.game.details}>
            A web version of the game
            <a
              href="https://oinkgames.com/en/games/analog/deep-sea-adventure/"
              target="_blank"
              rel="noreferrer"
            >
              Deep Sea Adventure
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
