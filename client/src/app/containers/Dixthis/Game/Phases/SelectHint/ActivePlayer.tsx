import { Button } from 'app/components/Button';
import { Input } from 'app/components/Form';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { Formik, FormikErrors } from 'formik';
import i18next from 'i18next';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { request } from 'utils/request';
import { VALIDATION } from '../../../constants';
import { useGameId } from '../../../hooks';
import { selectActivePlayer, selectPlayer } from '../../../state/selectors';
import { actions } from '../../../state/slice';
import { Game } from '../../../types';
import { BoardTopper, Card, CardList } from '../../components';

type Form = {
  hint: string;
  card: string;
};

const validate = ({ hint, card }: Form) => {
  const errors: FormikErrors<Form> = {};
  if (!hint || !hint.trim()) {
    errors.hint = i18next.t('validation.fieldRequired');
  } else if (hint.trim().length > VALIDATION.hint.maxLength) {
    errors.hint = i18next.t('validation.maxLengthExceeded', {
      max: VALIDATION.hint.maxLength,
    });
  }
  if (!card) {
    errors.card = i18next.t('validation.fieldRequired');
  }
  return errors;
};

export const ActivePlayer: React.FC = () => {
  const player = useSelector(selectPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  const gameId = useGameId();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const onSubmit = async ({ card, hint }: Form) => {
    try {
      const game = await request<Game>(
        `/dixthis/${gameId}/players/${player?.name}/hint`,
        {
          method: 'POST',
          body: JSON.stringify({ card, hint }),
        },
      );
      dispatch(actions.receiveGame(game));
    } catch (err) {
      console.log(err);
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'dixthis',
          message: `${t(translations.dixthis.errors.selectHint)}: ${
            err.message
          }`,
        }),
      );
    }
  };
  return (
    <>
      <BoardTopper>
        <h1 className="text-dixthis-primary-main">
          {t(translations.dixthis.selectingHint.activePlayerTitle, {
            playerName: activePlayer || '?',
          })}
        </h1>
      </BoardTopper>
      <Formik
        initialValues={{ hint: '', card: '' }}
        onSubmit={onSubmit}
        validate={validate}
      >
        {formikProps => (
          <form onSubmit={formikProps.handleSubmit}>
            <CardList>
              {player?.hand.map(card => (
                <Card
                  key={card}
                  card={card}
                  selected={card === formikProps.values.card}
                  onClick={() => formikProps.setFieldValue('card', card)}
                />
              ))}
            </CardList>
            <Input
              name="hint"
              placeholder={t(translations.dixthis.selectingHint.hintLabel)}
              label={t(translations.dixthis.selectingHint.hintLabel)}
            />
            <Button
              type="submit"
              className="my-4"
              disabled={!formikProps.values.card || formikProps.isSubmitting}
              gameName="dixthis"
            >
              {t(translations.dixthis.selectingHint.submit)}
            </Button>
          </form>
        )}
      </Formik>
    </>
  );
};
