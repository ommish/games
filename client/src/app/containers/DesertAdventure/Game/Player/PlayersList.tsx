import { Button } from 'app/components/Button';
import { Card } from 'app/components/Card';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { translations } from 'locales/i18n';
import React from 'react';
import { ThreeDots } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectActivePlayer,
  selectGame,
  selectPlayer,
  selectPlayers,
} from '../../state/selectors';
import { Treasure } from '../components';
import { totalPoints } from '../util';
import { COLORS } from './constants';
import { JoinAsPlayer } from './JoinAsPlayer';
import { JoinGame } from './JoinGame';
import { RemovePlayer } from './RemovePlayer';

type Props = {
  compact?: boolean;
};
export const PlayersList: React.FC<Props> = props => {
  const { t } = useTranslation();
  const game = useSelector(selectGame);
  const user = useSelector(selectPlayer);
  const players = useSelector(selectPlayers);
  const activePlayer = useSelector(selectActivePlayer);
  const dispatch = useDispatch();

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    dispatch(
      snackbar.showSnackbar({
        className: 'primary',
        gameName: 'desert-adventure',
        message: 'Copied!',
      }),
    );
  };

  if (!game) return null;

  return (
    <div>
      <ul className={`${props.compact ? '' : 'flex flex-wrap'}`}>
        {players?.map((player, i) => (
          <li
            key={player.name}
            className={`w-full ${
              props.compact ? '' : 'sm:w-1/2 md:w-1/3 lg:w-1/4'
            } `}
          >
            <Card
              className=" mr-2 mb-2 border-2 max-w-xl mb-2"
              style={{
                borderColor: COLORS[player.color],
                color: COLORS[player.color],
              }}
            >
              <div className="flex justify-between font-bold">
                <h2
                  className="text-desert-secondary-main mr-4 flex items-center"
                  style={{
                    color: COLORS[player.color],
                  }}
                >
                  {player.name}{' '}
                  {player.name === user?.name
                    ? t(translations.desertAdventure.players.you)
                    : ''}
                  {game.state === 'active' &&
                    !props.compact &&
                    activePlayer?.name === player.name && (
                      <ThreeDots className="ml-2" />
                    )}
                </h2>
                {user ? (
                  <RemovePlayer playerName={player.name} />
                ) : (
                  <JoinAsPlayer player={player.name} />
                )}
              </div>
              <div className="mt-4">
                {game.state === 'over'
                  ? t(translations.desertAdventure.players.totalPoints, {
                      points: totalPoints(player),
                    })
                  : null}
              </div>
              {!props.compact &&
                new Array(game.rounds).fill(null).map((r, i) => (
                  <div key={i} className="mt-4">
                    <span className="font-medium">
                      {t(translations.desertAdventure.players.round, {
                        round: i + 1,
                      })}
                    </span>
                    <div className="flex flex-wrap items-center">
                      {player.treasure[i + 1].map((block, j) => (
                        <div key={`${i}.${j}`} className="mr-4 flex flex-wrap">
                          {block.map((treasure, k) => (
                            <Treasure
                              key={`${j}.${k}`}
                              treasure={treasure}
                              count={block.length}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </Card>
          </li>
        ))}
      </ul>
      <Button
        className="mt-4"
        variant="grey"
        size="small"
        onClick={copyLink}
        gameName="desert-adventure"
      >
        {t(translations.game.copyLink)}
      </Button>
      <JoinGame />
    </div>
  );
};
