import React from 'react';
import { useTranslation } from 'react-i18next';

const baseClasses =
  'inline-flex items-center justify-center border border-error-light rounded mr-2 w-16';
const selectedClasses = 'bg-white';
export function LanguageSwitch() {
  const { i18n } = useTranslation();
  const handleLanguageChange = (language: string) => () => {
    i18n.changeLanguage(language);
  };

  return (
    <div className="h-full flex items-center">
      <button
        type="button"
        onClick={handleLanguageChange('en')}
        className={`${baseClasses} ${
          i18n.language === 'en' ? selectedClasses : ''
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={handleLanguageChange('jp')}
        className={`${baseClasses} ${
          i18n.language === 'jp' ? selectedClasses : ''
        }`}
      >
        JP
      </button>
    </div>
  );
}
