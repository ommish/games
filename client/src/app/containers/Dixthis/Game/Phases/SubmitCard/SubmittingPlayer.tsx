import { Button } from 'app/components/Button';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { translations } from 'locales/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { request } from 'utils/request';
import { useGameId } from '../../../hooks';
import { selectPlayer, selectSubmittedCard } from '../../../state/selectors';
import { actions } from '../../../state/slice';
import { Game } from '../../../types';
import {
  BoardTopper,
  Card,
  CardList,
  Hint,
  SuccessMessage,
} from '../../components';

export const SubmittingPlayer: React.FC = () => {
  const player = useSelector(selectPlayer);
  const submission = useSelector(selectSubmittedCard);
  const [cardToSubmit, setCard] = useState('');
  const dispatch = useDispatch();
  const gameId = useGameId();
  const { t } = useTranslation();
  const [isSubmitting, setSubmitting] = useState(false);
  const onClick = async () => {
    try {
      setSubmitting(true);
      const game = await request<Game>(
        `/dixthis/${gameId}/players/${player?.name}/card`,
        {
          method: 'POST',
          body: JSON.stringify({ card: cardToSubmit }),
        },
      );
      dispatch(actions.receiveGame(game));
    } catch (err) {
      console.log(err);
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'dixthis',
          message: `${t(translations.dixthis.errors.submitCard)}: ${
            err.message
          }`,
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <>
      <BoardTopper>
        <div>
          <Hint />
          <h2 className="text-dixthis-secondary-main">
            {t(translations.dixthis.submittingCards.submittingPlayersTitle)}
          </h2>
        </div>
      </BoardTopper>
      <div>
        <CardList>
          {player?.hand.map(card => (
            <Card
              key={card}
              card={card}
              selected={cardToSubmit === card || submission?.card === card}
              onClick={submission ? undefined : () => setCard(card)}
            />
          ))}
        </CardList>
        {submission ? (
          <SuccessMessage
            message={t(translations.dixthis.submittingCards.submittedMessage)}
          />
        ) : (
          <Button
            type="button"
            className="my-4"
            onClick={onClick}
            disabled={!cardToSubmit || isSubmitting}
            gameName="dixthis"
          >
            {t(translations.dixthis.submittingCards.submit)}
          </Button>
        )}
      </div>
    </>
  );
};
