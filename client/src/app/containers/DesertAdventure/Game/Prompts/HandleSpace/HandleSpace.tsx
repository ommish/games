import { Button } from 'app/components/Button';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { Formik } from 'formik';
import { translations } from 'locales/i18n';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { request } from 'utils/request';
import { selectGame, selectPlayer } from '../../../state/selectors';
import { Game } from '../../../types';
import { DropTreasure } from './DropTreasure';
import { IgnoreTreasure } from './IgnoreTreasure';
import { TakeTreasure } from './TakeTreasure';
import { Form } from './types';

const tabClasses = 'mr-4';
const inactiveTabClasses =
  'border-b border-desert-grey-main text-desert-grey-main';
const disabledTabClasses = 'opacity-50';
const activeTabClasses =
  'border-b-2 border-desert-secondary-main text-desert-secondary-main font-bold';

export const HandleSpace: React.FC = () => {
  const { t } = useTranslation();
  const game = useSelector(selectGame);
  const user = useSelector(selectPlayer);
  const dispatch = useDispatch();

  const onSubmit = async ({ action, dropIndex }: Form) => {
    try {
      await request<{
        game: Game;
        playerName: string;
      }>(`/desert-adventure/${game?.id}/players/${user?.name}/treasure`, {
        method: 'PUT',
        body: JSON.stringify({
          action,
          dropIndex,
        }),
      });
    } catch (err) {
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'desert-adventure',
          message:
            err.message ||
            t(translations.desertAdventure.errors.handleTreasure),
        }),
      );
    }
  };

  const autoDecide =
    game &&
    user &&
    !user.treasure[game.round].length &&
    !game.path[user.position];

  useEffect(() => {
    if (autoDecide) {
      onSubmit({ action: 'ignore-treasure', dropIndex: undefined });
    }
    // eslint-disable-next-line
  }, [game?.phase]);

  if (!game || !user || autoDecide) {
    return null;
  }

  return (
    <div>
      <h1 className="text-desert-primary-main">
        {t(translations.desertAdventure.handleSpace.title)}
      </h1>
      <Formik
        initialValues={{
          action: 'ignore-treasure',
          dropIndex: undefined,
        }}
        onSubmit={onSubmit}
      >
        {formikProps => (
          <form onSubmit={formikProps.handleSubmit} className="w-full mt-4">
            <div className="flex mb-4">
              <button
                type="button"
                disabled={!game.path[user.position]}
                className={`${tabClasses} ${
                  !game.path[user.position] ? disabledTabClasses : ''
                } ${
                  formikProps.values.action === 'take-treasure'
                    ? activeTabClasses
                    : inactiveTabClasses
                }`}
                onClick={() =>
                  formikProps.setFieldValue('action', 'take-treasure')
                }
              >
                {t(translations.desertAdventure.handleSpace.takeTreasure)}
              </button>
              <button
                type="button"
                disabled={
                  !!game.path[user.position] ||
                  !user.treasure[game.round].length
                }
                className={`${tabClasses} ${
                  !!game.path[user.position] ||
                  !user.treasure[game.round].length
                    ? disabledTabClasses
                    : ''
                } ${
                  formikProps.values.action === 'drop-treasure'
                    ? activeTabClasses
                    : inactiveTabClasses
                }`}
                onClick={() =>
                  formikProps.setFieldValue('action', 'drop-treasure')
                }
              >
                {t(translations.desertAdventure.handleSpace.dropTreasure)}
              </button>
              <button
                type="button"
                className={`${tabClasses} ${
                  formikProps.values.action === 'ignore-treasure'
                    ? activeTabClasses
                    : inactiveTabClasses
                }`}
                onClick={() =>
                  formikProps.setFieldValue('action', 'ignore-treasure')
                }
              >
                {t(translations.desertAdventure.handleSpace.ignoreTreasure)}
              </button>
            </div>
            {formikProps.values.action === 'ignore-treasure' ? (
              <IgnoreTreasure form={formikProps} />
            ) : formikProps.values.action === 'take-treasure' ? (
              <TakeTreasure form={formikProps} />
            ) : formikProps.values.action === 'drop-treasure' ? (
              <DropTreasure form={formikProps} />
            ) : null}
            <Button
              type="submit"
              gameName="desert-adventure"
              className="mt-4"
              disabled={
                formikProps.isSubmitting ||
                !formikProps.values.action ||
                (formikProps.values.action === 'drop-treasure' &&
                  formikProps.values.dropIndex === undefined)
              }
            >
              {t(translations.desertAdventure.handleSpace.submit)}
            </Button>
          </form>
        )}
      </Formik>
    </div>
  );
};
