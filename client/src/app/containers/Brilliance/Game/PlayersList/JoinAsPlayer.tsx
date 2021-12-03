import { Button } from 'app/components/Button';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { actions } from '../../state/slice';

export const JoinAsPlayer: React.FC<{
  player: string;
}> = ({ player }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const onClick = () => {
    dispatch(actions.setPlayer(player));
  };

  return (
    <Button
      variant="outlined"
      type="button"
      onClick={onClick}
      size="small"
      gameName="brilliance"
    >
      {t(translations.game.joinAsPlayer)}
    </Button>
  );
};
