import { Card } from 'app/components/Card';
import { translations } from 'locales/i18n';
import { sortBy } from 'lodash';
import React from 'react';
import { FlagFill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  selectActivePlayer,
  selectLeadingPoints,
  selectPlayer,
  selectPlayers,
} from '../../state/selectors';
import { JoinAsPlayer } from './JoinAsPlayer';
import { PlayerName } from './PlayerName';
import { PlayerStatus } from './PlayerStatus';
import { RemovePlayer } from './RemovePlayer';

export const PlayersList: React.FC = () => {
  const { t } = useTranslation();
  const player = useSelector(selectPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  const players = useSelector(selectPlayers);
  const leadingPoints = useSelector(selectLeadingPoints);

  return (
    <ul className="w-full grid grid-flow-col md:grid-flow-row overflow-x-auto">
      {sortBy(players || [], ({ points }) => -points).map(
        ({ name, points, title }) => (
          <li key={name} className="mb-2" style={{ minWidth: '200px' }}>
            <Card
              className={` ${
                name === activePlayer
                  ? 'border border-dixthis-primary-dark bg-dixthis-primary-extraLight font-semibold'
                  : 'border border-dixthis-grey-dark bg-dixthis-grey-extraLight'
              }`}
            >
              <h3 className="text-dixthis-primary-dark flex items-center space-between">
                {points && points === leadingPoints ? (
                  <FlagFill className="mr-1 text-dixthis-error-main" />
                ) : null}{' '}
                <PlayerName name={name} title={title} />
                <PlayerStatus playerName={name} />
              </h3>
              <strong>{t(translations.dixthis.players.pointsLabel)}</strong>:{' '}
              {points}
              <div className="w-full flex justify-end">
                {player ? (
                  <RemovePlayer playerName={name} />
                ) : (
                  <JoinAsPlayer player={name} />
                )}
              </div>
            </Card>
          </li>
        ),
      )}
    </ul>
  );
};
