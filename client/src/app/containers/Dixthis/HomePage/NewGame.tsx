import { Button } from 'app/components/Button';
import { Checkbox, Input } from 'app/components/Form';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { Formik } from 'formik';
import i18next from 'i18next';
import { translations } from 'locales/i18n';
import { shuffle } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { request } from 'utils/request';
import {
  DECK,
  PG13_DECK,
  POINTS_TO_WIN,
  SPECIAL_DECK,
  VALIDATION,
} from '../constants';
import { actions } from '../state/slice';

type SecretConfig = {
  upperNormalCount: number;
  lowerNormalCount: number;
  specialCount: number;
  pg13: boolean;
};
export type Form = {
  playerName: string;
  pointsToWin: number;
  deck: SecretConfig;
};

const validate = ({ playerName, pointsToWin, deck }: Form) => {
  const errors = {} as any;
  if (!playerName || !playerName.trim()) {
    errors.playerName = i18next.t('validation.fieldRequired');
  } else if (playerName.trim().length > 20) {
    errors.playerName = i18next.t('validation.maxLengthExceeded', {
      max: 20,
    });
  }
  if (pointsToWin && pointsToWin > VALIDATION.pointsToWin.max) {
    errors.pointsToWin = i18next.t('validation.maxExceeded', {
      max: VALIDATION.pointsToWin.max,
    });
  } else if (pointsToWin && pointsToWin < VALIDATION.pointsToWin.min) {
    errors.pointsToWin = i18next.t('validation.minExceeded', {
      min: VALIDATION.pointsToWin.min,
    });
  } else if (pointsToWin && Math.floor(pointsToWin) !== pointsToWin) {
    errors.pointsToWin = i18next.t('validation.integerOnly');
  }
  errors.deck = {};
  if (typeof deck.upperNormalCount !== 'number') {
    errors.deck.upperNormalCount = i18next.t('validation.fieldRequired');
  } else if (deck.upperNormalCount < 0) {
    errors.deck.upperNormalCount = i18next.t('validation.minExceeded', {
      min: 0,
    });
  }
  if (typeof deck.lowerNormalCount !== 'number') {
    errors.deck.lowerNormalCount = i18next.t('validation.fieldRequired');
  } else if (deck.lowerNormalCount < 0) {
    errors.deck.lowerNormalCount = i18next.t('validation.minExceeded', {
      min: 0,
    });
  } else if (deck.lowerNormalCount + deck.upperNormalCount > DECK.length) {
    errors.deck.lowerNormalCount = i18next.t('validation.maxExceeded', {
      max: DECK.length - deck.upperNormalCount,
    });
  }
  if (typeof deck.specialCount !== 'number') {
    errors.deck.specialCount = i18next.t('validation.fieldRequired');
  } else if (deck.specialCount < 0) {
    errors.deck.specialCount = i18next.t('validation.minExceeded', {
      min: 0,
    });
  } else if (deck.specialCount > SPECIAL_DECK.length) {
    errors.deck.specialCount = i18next.t('validation.maxExceeded', {
      max: SPECIAL_DECK.length,
    });
  }
  if (!Object.keys(errors.deck).length) {
    delete errors.deck;
  }
  return errors;
};

function buildCustomDeck({
  upperNormalCount,
  lowerNormalCount,
  specialCount,
  pg13,
}: SecretConfig): string[] {
  const allNormal = shuffle(pg13 ? DECK.concat(PG13_DECK) : DECK);
  const allSpecial = shuffle(SPECIAL_DECK);

  const topNormal = shuffle(allNormal.slice(0, upperNormalCount));
  const bottomNormal = shuffle(
    allNormal.slice(upperNormalCount, upperNormalCount + lowerNormalCount),
  );
  const bottomSpecial = shuffle(allSpecial.slice(0, specialCount));
  const bottom = shuffle(bottomNormal.concat(bottomSpecial));
  return bottom.concat(topNormal);
}

export const NewGame: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = async ({ playerName, pointsToWin, deck }: Form) => {
    try {
      const reqBody = {
        playerName,
        pointsToWin: pointsToWin || null,
        deck: deck ? buildCustomDeck(deck) : undefined,
      };
      const res = await request<{ gameId: string; playerName: string }>(
        '/dixthis',
        {
          method: 'POST',
          body: JSON.stringify(reqBody),
        },
      );
      dispatch(actions.setPlayer(res.playerName));
      history.push(`/dixthis/${res.gameId}`);
    } catch (err) {
      console.log(err);
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'dixthis',
          message: err.message || t(translations.dixthis.errors.newGame),
        }),
      );
    }
  };
  return (
    <Formik
      initialValues={{
        playerName: '',
        pointsToWin: POINTS_TO_WIN,
        deck: {
          upperNormalCount: 50,
          lowerNormalCount: 100,
          specialCount: SPECIAL_DECK.length,
          pg13: true,
        },
      }}
      onSubmit={onSubmit}
      validate={validate}
    >
      {formikProps => (
        <form
          onSubmit={formikProps.handleSubmit}
          className="flex flex-col items-center"
        >
          <h2 className="text-dixthis-secondary-main">
            {t(translations.game.startNewGame)}
          </h2>
          <Input
            name="playerName"
            placeholder={t(translations.dixthis.players.nameLabel)}
            label={t(translations.dixthis.players.nameLabel)}
          />
          <Input
            name="pointsToWin"
            type="number"
            placeholder={t(translations.dixthis.game.pointsToWin)}
            label={t(translations.dixthis.game.pointsToWin)}
            tooltip={t(translations.dixthis.game.pointsToWinInfo)}
          />
          <Input
            name="deck.upperNormalCount"
            type="number"
            placeholder="Upper Normal Count"
            label="Upper Normal Count"
          />
          <Input
            name="deck.lowerNormalCount"
            type="number"
            placeholder="Lower Count"
            label="Lower Count"
          />
          <Input
            name="deck.specialCount"
            type="number"
            placeholder="Special Count"
            label="Special Count"
            tooltip={t(translations.dixthis.game.specialCardsInfo)}
          />
          <Checkbox
            name="deck.pg13"
            label="PG13"
            tooltip={t(translations.dixthis.game.pg13Info)}
          />
          <Button
            type="submit"
            disabled={formikProps.isSubmitting}
            className="mt-4"
            gameName="dixthis"
          >
            {t(translations.game.newGame)}
          </Button>
        </form>
      )}
    </Formik>
  );
};
