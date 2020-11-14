import { Switch } from '@material-ui/core';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';

export type CardListType = 'pool' | 'hand';

export const ListToggle: React.FC<{
  listType: CardListType;
  setListType: (listType: CardListType) => void;
}> = ({ listType, setListType }) => {
  const { t } = useTranslation();
  return (
    <div className="w-64">
      {t(translations.dixthis.game.cardListHand)}
      <Switch
        checked={listType === 'pool'}
        onChange={e => setListType(e.target.checked ? 'pool' : 'hand')}
        color="default"
      />
      {t(translations.dixthis.game.cardListPool)}
    </div>
  );
};
