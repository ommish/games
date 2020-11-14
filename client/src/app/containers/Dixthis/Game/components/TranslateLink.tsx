import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectHint } from '../../state/selectors';

export const TranslateLink: React.FC = () => {
  const hint = useSelector(selectHint) || '';
  const { t, i18n } = useTranslation();

  return (
    <a
      href={`https://translate.google.com/#view=home&op=translate&sl=${
        i18n.language === 'en' ? 'ja' : 'en'
      }&tl=${
        i18n.language === 'en' ? 'en' : 'ja'
      }&text=${window.encodeURIComponent(hint)}`}
      target="_blank"
      rel="noreferrer"
      className="text-dixthis-grey-light font-normal text-xl mx-4 opacity-50"
    >
      ({t(translations.i18nFeature.translate)})
    </a>
  );
};
