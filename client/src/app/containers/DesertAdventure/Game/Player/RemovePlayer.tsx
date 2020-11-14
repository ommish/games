import { Button } from 'app/components/Button';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { translations } from 'locales/i18n';
import React, { useState } from 'react';
import { XCircle } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { request } from 'utils/request';
import { useGameId } from '../../hooks';
import { actions } from '../../state/slice';
import { Game } from '../../types';

export const RemovePlayer: React.FC<{ playerName: string }> = props => {
  const { t } = useTranslation();
  const gameId = useGameId();
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const onClick = async () => {
    try {
      setSubmitting(true);
      const game = await request<Game>(
        `/desert-adventure/${gameId}/players/${props.playerName}`,
        {
          method: 'DELETE',
        },
      );
      setSubmitting(false);
      dispatch(actions.receiveGame(game));
    } catch (err) {
      console.log(err);
      setSubmitting(false);
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'desert-adventure',
          message:
            err.message || t(translations.desertAdventure.errors.removePlayer),
        }),
      );
    }
  };

  return (
    <Button
      variant="dangerous"
      type="button"
      onClick={onClick}
      disabled={isSubmitting}
      size="small"
      gameName="desert-adventure"
    >
      <XCircle className="mr-1" />
      {t(translations.desertAdventure.players.removePlayer)}
    </Button>
  );
};
