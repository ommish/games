import { Dialog } from '@material-ui/core';
import { Button } from 'app/components/Button';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { translations } from 'locales/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { request } from 'utils/request';
import { MIN_PLAYERS } from '../../constants';
import { useGameId } from '../../hooks';
import { selectGame, selectPlayer } from '../../state/selectors';
import { actions } from '../../state/slice';
import { Game } from '../../types';
import { PlayersList } from '../PlayersList';

export const InactiveOverlay: React.FC = () => {
  const game = useSelector(selectGame);
  const player = useSelector(selectPlayer);
  const { t } = useTranslation();
  const gameId = useGameId();
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const onClick = async () => {
    try {
      setSubmitting(true);
      const game = await request<Game>(`/brilliance/${gameId}`, {
        method: 'PUT',
      });
      setSubmitting(false);
      dispatch(actions.receiveGame(game));
    } catch (err) {
      console.log(err);
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'brilliance',
          message: err.message || t(translations.brilliance.errors.startGame),
        }),
      );
      setSubmitting(false);
    }
  };
  return (
    <Dialog open={game?.state === 'inactive'} disableBackdropClick>
      <div className="brilliance">
        <h1 className="text-brilliance-primary-main">
          {t(translations.brilliance.inactiveGame.title)}
        </h1>
        <PlayersList compact />
        <div className="my-4">
          {(game?.players.length || 0) < MIN_PLAYERS ? (
            <div className="text-brilliance-error-main font-medium">
              {t(translations.brilliance.inactiveGame.waitingForPlayers, {
                min: MIN_PLAYERS,
              })}
            </div>
          ) : (
            player && (
              <Button
                type="button"
                onClick={onClick}
                disabled={isSubmitting}
                gameName="brilliance"
              >
                {t(translations.brilliance.inactiveGame.startGame)}
              </Button>
            )
          )}
        </div>
      </div>
    </Dialog>
  );
};
