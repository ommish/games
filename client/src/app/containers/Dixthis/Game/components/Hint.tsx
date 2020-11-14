import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectActivePlayer, selectHint } from '../../state/selectors';
import { TranslateLink } from './TranslateLink';

export const Hint: React.FC = () => {
  const activePlayer = useSelector(selectActivePlayer);
  const hint = useSelector(selectHint);
  const { t } = useTranslation();
  return (
    <h1 className="text-dixthis-primary-main">
      {t(translations.dixthis.game.activeHint, {
        activePlayer,
      })}
      : <span className="text-dixthis-error-main">{hint}</span>
      <TranslateLink />
    </h1>
  );
};
