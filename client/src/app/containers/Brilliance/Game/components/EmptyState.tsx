import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

type Category = 'tokens' | 'cards' | 'nobles' | 'reserve';
type Props = {
  category: Category;
};

const translationsByCategory: Record<Category, string> = {
  tokens: translations.brilliance.tokens.none,
  cards: translations.brilliance.cards.none,
  nobles: translations.brilliance.nobles.none,
  reserve: translations.brilliance.reserve.none,
};

export const EmptyState: React.FC<Props> = ({ category }) => {
  const { t } = useTranslation();
  return (
    <div className="text-grey-light italic my-1">
      {t(translationsByCategory[category])}
    </div>
  );
};
