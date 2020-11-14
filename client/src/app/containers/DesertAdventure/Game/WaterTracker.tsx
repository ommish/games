import { Tooltip } from '@material-ui/core';
import { translations } from 'locales/i18n';
import React from 'react';
import { Droplet, DropletFill, XCircle } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { STARTING_WATER } from '../constants';
import { selectGame } from '../state/selectors';

const WATER = new Array(STARTING_WATER + 1).fill(null);

export const WaterTracker: React.FC = () => {
  const { t } = useTranslation();

  const game = useSelector(selectGame);

  if (!game) return null;

  return (
    <div
      className="w-full p-6 text-white text-center"
      style={{ background: '#191D32' }}
    >
      <h1 className="uppercase text-desert-primary-extraLight">
        <div>
          {t(translations.desertAdventure.water.round, {
            round: game.round,
            rounds: game.rounds,
          })}
        </div>
        {t(translations.desertAdventure.water.title)}: {Math.max(0, game.water)}
      </h1>
      <div className="flex flex-wrap justify-center flex-row-reverse">
        {WATER.map((w, i) => (
          <Tooltip key={i} title={i}>
            <div className="m-2 text-lg">
              {i === 0 ? (
                <XCircle />
              ) : i <= game.water ? (
                <DropletFill color="#0075A2" />
              ) : (
                <Droplet />
              )}
            </div>
          </Tooltip>
        ))}
      </div>
    </div>
  );
};
