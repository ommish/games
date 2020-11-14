import { Button } from 'app/components/Button';
import { Input } from 'app/components/Form';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { Formik, FormikErrors } from 'formik';
import i18next from 'i18next';
import { translations } from 'locales/i18n';
import React from 'react';
import { PlusCircle } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import { request } from 'utils/request';
import { MAX_PLAYERS, VALIDATION } from '../constants';
import {
  selectGameState,
  selectPlayer,
  selectPlayers,
  selectPointsToWin,
} from '../state/selectors';
import { actions } from '../state/slice';
import { Game } from '../types';

type Form = {
  playerName: string;
  points: number;
  pointsToWin: number | null;
};

const validate = ({ playerName, points, pointsToWin }: Form) => {
  const errors: FormikErrors<Form> = {};
  if (!playerName || !playerName.trim()) {
    errors.playerName = i18next.t('validation.fieldRequired');
  } else if (playerName.trim().length > VALIDATION.playerName.maxLength) {
    errors.playerName = i18next.t('validation.maxLengthExceeded', {
      max: VALIDATION.playerName.maxLength,
    });
  }
  if (
    (pointsToWin && points > pointsToWin - 1) ||
    points > VALIDATION.playerPoints.max - 1
  ) {
    errors.points = i18next.t('validation.maxExceeded', {
      max: pointsToWin ? pointsToWin - 1 : VALIDATION.playerPoints.max,
    });
  } else if (points < VALIDATION.playerPoints.min) {
    errors.points = i18next.t('validation.minExceeded', {
      min: VALIDATION.playerPoints.min,
    });
  } else if (Math.floor(points) !== points) {
    errors.points = i18next.t('validation.integerOnly');
  }
  return errors;
};

export const JoinGame: React.FC = () => {
  const { t } = useTranslation();
  const match = useRouteMatch<{ gameId: string }>('/dixthis/:gameId');
  const gameId = match?.params.gameId;
  const gameState = useSelector(selectGameState);
  const player = useSelector(selectPlayer);
  const players = useSelector(selectPlayers);
  const pointsToWin = useSelector(selectPointsToWin);
  const dispatch = useDispatch();

  const onSubmit = async ({ playerName, points }: Form) => {
    try {
      const res = await request<{
        game: Game;
        playerName: string;
      }>(`/dixthis/${gameId}/players`, {
        method: 'POST',
        body: JSON.stringify({
          playerName,
          points,
        }),
      });
      dispatch(actions.setPlayer(res.playerName));
      dispatch(actions.receiveGame(res.game));
    } catch (err) {
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'dixthis',
          message: err.message || t(translations.dixthis.errors.joinGame),
        }),
      );
    }
  };

  if (
    gameState === 'over' ||
    !!player ||
    (players && players.length >= MAX_PLAYERS)
  ) {
    return null;
  }

  return (
    <Formik
      initialValues={{ playerName: '', points: 0, pointsToWin }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit} className="w-full">
          <div className="flex">
            <Input
              name="playerName"
              placeholder={t(translations.dixthis.players.nameLabel)}
              label={t(translations.dixthis.players.nameLabel)}
            />
            <Input
              name="points"
              type="number"
              placeholder={t(translations.dixthis.players.initialPointsLabel)}
              label={t(translations.dixthis.players.initialPointsLabel)}
            />
          </div>
          <Button
            type="submit"
            disabled={formikProps.isSubmitting}
            gameName="dixthis"
          >
            <PlusCircle className="mr-2" />
            {t(translations.game.joinGame)}
          </Button>
        </form>
      )}
    </Formik>
  );
};
