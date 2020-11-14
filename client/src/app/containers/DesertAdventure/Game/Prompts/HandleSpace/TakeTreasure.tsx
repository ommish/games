import { FormikProps } from 'formik';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectGame, selectPlayer } from '../../../state/selectors';
import { Form } from './types';

type Props = {
  form: FormikProps<Form>;
};
export const TakeTreasure: React.FC<Props> = props => {
  const game = useSelector(selectGame);
  const user = useSelector(selectPlayer);
  const { t } = useTranslation();

  if (!game || !user) return null;

  return <div>{t(translations.desertAdventure.handleSpace.takeTreasureTitle)}</div>;
};
