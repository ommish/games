import { Button } from 'app/components/Button';
import { Input } from 'app/components/Form';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { Formik } from 'formik';
import i18next from 'i18next';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { request } from 'utils/request';
import { VALIDATION } from '../constants';
import { actions } from '../state/slice';

export type Form = {
  playerName: string;
  rounds: number;
};

// TODO- allow color selection
const validate = ({ playerName, rounds }: Form) => {
  const errors = {} as any;
  if (!playerName || !playerName.trim()) {
    errors.playerName = i18next.t('validation.fieldRequired');
  } else if (playerName.trim().length > 20) {
    errors.playerName = i18next.t('validation.maxLengthExceeded', {
      max: 20,
    });
  }
  if (rounds > VALIDATION.rounds.max) {
    errors.rounds = i18next.t('validation.maxExceeded', {
      max: VALIDATION.rounds.max,
    });
  } else if (rounds < VALIDATION.rounds.min) {
    errors.rounds = i18next.t('validation.minExceeded', {
      min: VALIDATION.rounds.min,
    });
  } else if (rounds && Math.floor(rounds) !== rounds) {
    errors.pointsToWin = i18next.t('validation.integerOnly');
  } else if (typeof rounds !== 'number') {
    errors.pointsToWin = i18next.t('validation.fieldRequired');
  }
  return errors;
};

export const NewGame: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = async ({ playerName, rounds }: Form) => {
    try {
      const reqBody = {
        playerName,
        rounds,
      };
      const res = await request<{ gameId: string; playerName: string }>(
        '/desert-adventure',
        {
          method: 'POST',
          body: JSON.stringify(reqBody),
        },
      );
      dispatch(actions.setPlayer(res.playerName));
      history.push(`/desert-adventure/${res.gameId}`);
    } catch (err) {
      console.log(err);
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'desert-adventure',
          message:
            err.message || t(translations.desertAdventure.errors.newGame),
        }),
      );
    }
  };
  return (
    <Formik
      initialValues={{
        playerName: '',
        rounds: 3,
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {formikProps => (
        <form
          onSubmit={formikProps.handleSubmit}
          className="flex flex-col items-center"
        >
          <h2 className="text-desert-secondary-main">
            {t(translations.game.startNewGame)}
          </h2>
          <Input
            name="playerName"
            placeholder={t(translations.desertAdventure.players.nameLabel)}
            label={t(translations.desertAdventure.players.nameLabel)}
          />
          <Input
            name="rounds"
            type="number"
            placeholder={t(translations.desertAdventure.game.rounds)}
            label={t(translations.desertAdventure.game.rounds)}
          />
          <Button
            type="submit"
            disabled={formikProps.isSubmitting}
            className="mt-4"
            gameName="desert-adventure"
          >
            {t(translations.game.newGame)}
          </Button>
        </form>
      )}
    </Formik>
  );
};
