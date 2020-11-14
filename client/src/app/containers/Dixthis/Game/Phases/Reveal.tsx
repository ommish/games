import { translations } from 'locales/i18n';
import React, { useEffect, useRef, useState } from 'react';
import { StarFill } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  selectNextRoundAt,
  selectSubmittedCards,
  selectSubmittedGuesses,
} from '../../state/selectors';
import { BoardTopper, Card, CardList, Hint } from '../components';

export const Reveal: React.FC = () => {
  const cards = useSelector(selectSubmittedCards);
  const guesses = useSelector(selectSubmittedGuesses);
  const nextRoundAt = useSelector(selectNextRoundAt);

  const { t } = useTranslation();
  const [now, setNow] = useState(Date.now());
  const nowRef = useRef(now);
  useEffect(() => {
    const int = setInterval(() => {
      nowRef.current = nowRef.current + 1000;
      setNow(nowRef.current + 1000);
      setNow(nowRef.current + 1000);
    }, 1000);
    return () => {
      clearInterval(int);
    };
  }, []);
  return (
    <>
      <BoardTopper>
        <Hint />
        <div className="absolute top-0 right-0 text-2xl font-semibold text-dixthis-error-main">
          {nextRoundAt &&
            t(translations.dixthis.revealingOriginal.nextRoundTime, {
              seconds: Math.max(0, Math.floor((nextRoundAt - now) / 1000)),
            })}
        </div>
      </BoardTopper>
      <CardList>
        {cards?.map(({ card, player, original }) => (
          <div key={card} className="flex flex-col items-center">
            <Card key={card} card={card} selected={original} />
            <h3 className="text-dixthis-primary-dark">
              {t(translations.dixthis.revealingOriginal.cardPlayerLabel, {
                player,
              })}
            </h3>
            {original && (
              <StarFill className="text-3xl text-dixthis-error-main my-2" />
            )}
            {(guesses?.filter(guess => guess.card === card).length || 0) >
              0 && (
              <h4 className="text-dixthis-secondary-main">
                {t(translations.dixthis.revealingOriginal.guessesTitle)}
              </h4>
            )}
            {guesses
              ?.filter(guess => guess.card === card)
              .map(guess => (
                <h5 className="text-dixthis-primary-dark" key={guess.player}>
                  {guess.player}
                </h5>
              ))}
          </div>
        ))}
      </CardList>
    </>
  );
};
