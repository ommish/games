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
import { Overlay } from '../components';

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
      const game = await request<Game>(`/dixthis/${gameId}`, {
        method: 'PUT',
      });
      setSubmitting(false);
      dispatch(actions.receiveGame(game));
    } catch (err) {
      console.log(err);
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'dixthis',
          message: err.message || t(translations.dixthis.errors.startGame),
        }),
      );
      setSubmitting(false);
    }
  };
  return (
    <Overlay>
      <h1 className="text-dixthis-primary-main">
        {t(translations.dixthis.inactiveGame.title)}
      </h1>
      {(game?.players.length || 0) < MIN_PLAYERS ? (
        <div className="text-dixthis-error-main">
          {t(translations.dixthis.inactiveGame.waitingForPlayers, {
            min: MIN_PLAYERS,
          })}
        </div>
      ) : (
        player && (
          <Button
            type="button"
            onClick={onClick}
            disabled={isSubmitting}
            gameName="dixthis"
          >
            {t(translations.dixthis.inactiveGame.startGame)}
          </Button>
        )
      )}
    </Overlay>
  );
};
