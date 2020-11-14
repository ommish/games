import { translations } from 'locales/i18n';
import * as React from 'react';
import { House } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export function HomeLink() {
  const { t } = useTranslation();
  return (
    <Link
      className="h-full flex items-center"
      style={{ lineHeight: 'normal' }}
      to="/"
    >
      <House className="" />
      {t(translations.game.goHome)}
    </Link>
  );
}
