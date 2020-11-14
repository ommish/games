import { FormikProps } from 'formik';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectGame, selectPlayer } from '../../../state/selectors';
import { Treasure } from '../../components';
import { Form } from './types';

type Props = {
  form: FormikProps<Form>;
};
export const DropTreasure: React.FC<Props> = props => {
  const game = useSelector(selectGame);
  const user = useSelector(selectPlayer);
  const { t } = useTranslation();

  if (!game || !user) return null;

  return (
    <div>
      <div>{t(translations.desertAdventure.handleSpace.dropTreasureTitle)}</div>
      <div className="flex">
        {user.treasure[game.round].map((block, i) => (
          <button
            type="button"
            key={i}
            className={`m-4 ${
              props.form.values.dropIndex === i
                ? 'border-2 border-desert-primary-main'
                : 'border border-desert-grey-main'
            }`}
            onClick={() => props.form.setFieldValue('dropIndex', i)}
          >
            {block.map((treasure, j) => (
              <Treasure key={j} treasure={treasure} count={block.length} />
            ))}
          </button>
        ))}
      </div>
    </div>
  );
};
