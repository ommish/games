import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from '@material-ui/core';
import { Button } from 'app/components/Button';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { Formik } from 'formik';
import { translations } from 'locales/i18n';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { request } from 'utils/request';
import {
  selectActivePlayer,
  selectGame,
  selectPlayer,
} from '../../state/selectors';
import { Game } from '../../types';

type Form = {
  direction: 'forward' | 'backward';
};

export const SelectDirection: React.FC = () => {
  const { t } = useTranslation();
  const game = useSelector(selectGame);
  const user = useSelector(selectPlayer);
  const activePlayer = useSelector(selectActivePlayer);
  const dispatch = useDispatch();

  const onSubmit = async ({ direction }: Form) => {
    try {
      await request<{
        game: Game;
        playerName: string;
      }>(`/desert-adventure/${game?.id}/players/${user?.name}/direction`, {
        method: 'PUT',
        body: JSON.stringify({
          returning: direction === 'backward',
        }),
      });
    } catch (err) {
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'desert-adventure',
          message:
            err.message ||
            t(translations.desertAdventure.errors.selectDirection),
        }),
      );
    }
  };

  const autoDecide =
    game &&
    user &&
    (activePlayer?.returning || (activePlayer && activePlayer.position < 0));

  useEffect(() => {
    if (autoDecide) {
      console.log('autodeciding');
      if (activePlayer?.returning) {
        onSubmit({ direction: 'backward' });
      } else if (activePlayer && activePlayer.position < 0) {
        onSubmit({ direction: 'forward' });
      }
    }
    // eslint-disable-next-line
  }, [game?.phase]);

  if (!game || !user || autoDecide) {
    return null;
  }

  return (
    <div>
      <Formik
        initialValues={{
          direction: activePlayer?.returning ? 'backward' : 'forward',
        }}
        onSubmit={onSubmit}
      >
        {formikProps => (
          <form onSubmit={formikProps.handleSubmit} className="w-full mt-4">
            <div className="flex">
              <FormControl component="fieldset">
                <FormLabel component="legend">
                  {t(translations.desertAdventure.selectDirection.label)}
                </FormLabel>
                <RadioGroup
                  aria-label="direction"
                  name="direction"
                  value={formikProps.values.direction}
                  onChange={formikProps.handleChange}
                >
                  <FormControlLabel
                    value="forward"
                    control={<Radio />}
                    label={t(
                      translations.desertAdventure.selectDirection.forward,
                    )}
                  />
                  <FormControlLabel
                    value="backward"
                    control={<Radio />}
                    label={t(
                      translations.desertAdventure.selectDirection.backward,
                    )}
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <Button
              type="submit"
              disabled={formikProps.isSubmitting}
              gameName="desert-adventure"
            >
              {t(translations.desertAdventure.selectDirection.submit)}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
