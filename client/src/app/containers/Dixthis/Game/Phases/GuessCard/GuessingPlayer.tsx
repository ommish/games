import { Button } from 'app/components/Button';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { translations } from 'locales/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { request } from 'utils/request';
import { useGameId } from '../../../hooks';
import {
  selectPlayer,
  selectSubmittedCards,
  selectSubmittedGuess,
} from '../../../state/selectors';
import { actions } from '../../../state/slice';
import { Game } from '../../../types';
import {
  BoardTopper,
  Card,
  CardList,
  Hint,
  SuccessMessage,
} from '../../components';
import { CardListType, ListToggle } from './ListToggle';

export const GuessingPlayer: React.FC = () => {
  const pool = useSelector(selectSubmittedCards);
  const guess = useSelector(selectSubmittedGuess);
  const player = useSelector(selectPlayer);
  const [listType, setListType] = useState<CardListType>('pool');
  const [cardToSubmit, setCard] = useState<string>('');
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const gameId = useGameId();
  const [isSubmitting, setSubmitting] = useState(false);
  const onClick = async () => {
    try {
      setSubmitting(true);
      const game = await request<Game>(
        `/dixthis/${gameId}/players/${player?.name}/guess`,
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
          message: err.message || t(translations.dixthis.errors.submitCard),
        }),
      );
    } finally {
      setSubmitting(false);
    }
  };
  const ownCardError = () => {
    setCard('');
    dispatch(
      snackbar.showSnackbar({
        className: 'error',
        gameName: 'dixthis',
        message: t(translations.dixthis.submittingCards.ownCardError),
      }),
    );
  };
  return (
    <>
      <BoardTopper>
        <div>
          <Hint />
          <h2 className="text-dixthis-secondary-main">
            {t(translations.dixthis.guessingOriginal.title)}
          </h2>
        </div>
        <ListToggle listType={listType} setListType={setListType} />
      </BoardTopper>
      <div>
        <CardList>
          {listType === 'pool'
            ? pool?.map(card => (
                <Card
                  key={card.card}
                  card={card.card}
                  selected={
                    cardToSubmit === card.card || guess?.card === card.card
                  }
                  onClick={
                    !guess
                      ? card.player === player?.name
                        ? ownCardError
                        : () => setCard(card.card)
                      : undefined
                  }
                />
              ))
            : player?.hand?.map(card => <Card key={card} card={card} />)}
        </CardList>
        {guess ? (
          <SuccessMessage
            message={t(translations.dixthis.guessingOriginal.submittedMessage)}
          />
        ) : (
          listType === 'pool' && (
            <Button
              type="button"
              className="my-4"
              onClick={onClick}
              disabled={!cardToSubmit || isSubmitting}
              gameName="dixthis"
            >
              {t(translations.dixthis.guessingOriginal.submit)}
            </Button>
          )
        )}
      </div>
    </>
  );
};
