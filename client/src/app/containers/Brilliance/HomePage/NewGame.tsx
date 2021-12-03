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
import { actions } from '../state/slice';

export type Form = {
  playerName: string;
};

const validate = ({ playerName }: Form) => {
  const errors: { playerName?: string } = {};
  if (!playerName || !playerName.trim()) {
    errors.playerName = i18next.t('validation.fieldRequired');
  } else if (playerName.trim().length > 20) {
    errors.playerName = i18next.t('validation.maxLengthExceeded', {
      max: 20,
    });
  }
  return errors;
};

export const NewGame: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = async ({ playerName }: Form) => {
    try {
      const reqBody = {
        playerName,
      };
      const res = await request<{ gameId: string; playerName: string }>(
        '/brilliance',
        {
          method: 'POST',
          body: JSON.stringify(reqBody),
        },
      );
      dispatch(actions.setPlayer(res.playerName));
      history.push(`/brilliance/${res.gameId}`);
    } catch (err) {
      console.log(err);
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'brilliance',
          message: err.message || t(translations.brilliance.errors.newGame),
        }),
      );
    }
  };
  return (
    <Formik
      initialValues={{
        playerName: '',
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {formikProps => (
        <form
          onSubmit={formikProps.handleSubmit}
          className="flex flex-col items-center"
        >
          <h2 className="text-brilliance-secondary-main">
            {t(translations.game.startNewGame)}
          </h2>
          <Input
            name="playerName"
            placeholder={t(translations.brilliance.players.nameLabel)}
            label={t(translations.brilliance.players.nameLabel)}
          />
          <Button
            type="submit"
            disabled={formikProps.isSubmitting}
            className="mt-4"
            gameName="brilliance"
          >
            {t(translations.game.newGame)}
          </Button>
        </form>
      )}
    </Formik>
  );
};
