import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Overlay } from '../components';

export const FinishedOverlay: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Overlay>
      <h1 className="text-dixthis-primary-main">
        {t(translations.dixthis.finishedGame.title)}
      </h1>
      <div className="text-dixthis-error-main">
        {t(translations.dixthis.finishedGame.clearMessage)}
      </div>
    </Overlay>
  );
};
