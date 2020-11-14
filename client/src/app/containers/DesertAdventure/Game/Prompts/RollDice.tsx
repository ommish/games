import { Button } from 'app/components/Button';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { Formik, FormikProps } from 'formik';
import { translations } from 'locales/i18n';
import { random } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { request } from 'utils/request';
import { selectGame, selectPlayer } from '../../state/selectors';
import { DieValue, Game } from '../../types';
import { Die } from '../components/Die';

type Form = {
  die1: 0 | DieValue;
  die2: 0 | DieValue;
};

export const RollDice: React.FC = () => {
  const { t } = useTranslation();
  const game = useSelector(selectGame);
  const user = useSelector(selectPlayer);
  const dispatch = useDispatch();

  const onSubmit = async ({ die1, die2 }: Form) => {
    try {
      await request<{
        game: Game;
        playerName: string;
      }>(`/desert-adventure/${game?.id}/players/${user?.name}/position`, {
        method: 'PUT',
        body: JSON.stringify({
          roll: die1 + die2,
        }),
      });
    } catch (err) {
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'desert-adventure',
          message: err.message || t(translations.desertAdventure.errors.roll),
        }),
      );
    }
  };

  const onRoll = (
    setFieldValue: FormikProps<Form>['setFieldValue'],
    field: keyof Form,
  ) => () => {
    const roll = random(2, false) + 1;
    setFieldValue(field, roll);
  };

  if (!game || !user) {
    return null;
  }

  return (
    <div>
      <h1 className="text-desert-primary-main">
        {t(translations.desertAdventure.rollDice.title)}
      </h1>
      <Formik
        initialValues={{
          die1: 0,
          die2: 0,
        }}
        onSubmit={onSubmit}
      >
        {formikProps => (
          <form onSubmit={formikProps.handleSubmit} className="w-full mt-4">
            <div className="flex mb-4">
              <Die
                onClick={onRoll(formikProps.setFieldValue, 'die1')}
                roll={formikProps.values.die1}
              />
              <Die
                onClick={onRoll(formikProps.setFieldValue, 'die2')}
                roll={formikProps.values.die2}
              />
            </div>
            <div className="mb-4">
              {t(translations.desertAdventure.rollDice.subtractTreasure, {
                treasureCount: user.treasure[game.round].length,
              })}
            </div>
            <Button
              type="submit"
              gameName="desert-adventure"
              disabled={
                formikProps.isSubmitting ||
                !formikProps.values.die1 ||
                !formikProps.values.die2
              }
            >
              {t(translations.desertAdventure.rollDice.submit)}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
