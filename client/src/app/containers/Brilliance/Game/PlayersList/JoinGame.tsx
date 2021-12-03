import { Divider } from '@material-ui/core';
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
import { MAX_PLAYERS, VALIDATION } from '../../constants';
import {
  selectGameState,
  selectPlayer,
  selectPlayers,
} from '../../state/selectors';
import { actions } from '../../state/slice';
import { Game } from '../../types';

type Form = {
  playerName: string;
};

const validate = ({ playerName }: Form) => {
  const errors: FormikErrors<Form> = {};
  if (!playerName || !playerName.trim()) {
    errors.playerName = i18next.t('validation.fieldRequired');
  } else if (playerName.trim().length > VALIDATION.playerName.maxLength) {
    errors.playerName = i18next.t('validation.maxLengthExceeded', {
      max: VALIDATION.playerName.maxLength,
    });
  }
  return errors;
};

export const JoinGame: React.FC = () => {
  const { t } = useTranslation();
  const match = useRouteMatch<{ gameId: string }>('/brilliance/:gameId');
  const gameId = match?.params.gameId;
  const gameState = useSelector(selectGameState);
  const player = useSelector(selectPlayer);
  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();

  const onSubmit = async ({ playerName }: Form) => {
    try {
      const res = await request<{
        game: Game;
        playerName: string;
      }>(`/brilliance/${gameId}/players`, {
        method: 'POST',
        body: JSON.stringify({
          playerName,
        }),
      });
      dispatch(actions.setPlayer(res.playerName));
      dispatch(actions.receiveGame(res.game));
    } catch (err) {
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'brilliance',
          message: err.message || t(translations.brilliance.errors.joinGame),
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
      initialValues={{ playerName: '' }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {formikProps => (
        <form onSubmit={formikProps.handleSubmit} className="w-full">
          <Divider />
          <div className="flex">
            <Input
              name="playerName"
              placeholder={t(translations.brilliance.players.nameLabel)}
              label={t(translations.brilliance.players.nameLabel)}
            />
          </div>
          <Button
            type="submit"
            disabled={formikProps.isSubmitting}
            gameName="brilliance"
          >
            <PlusCircle className="mr-2" />
            {t(translations.game.joinGame)}
          </Button>
        </form>
      )}
    </Formik>
  );
};
