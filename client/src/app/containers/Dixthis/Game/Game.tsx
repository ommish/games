import { Tooltip } from '@material-ui/core';
import { Button } from 'app/components/Button';
import { LoadingIndicator } from 'app/components/LoadingIndicator';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { translations } from 'locales/i18n';
import React, { useEffect } from 'react';
import { InfoCircle } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useInjectReducer } from 'utils/redux-injectors';
import { useGameId } from '../hooks';
import { selectGame } from '../state/selectors';
import { actions, reducer } from '../state/slice';
import { Game as TGame } from '../types';
import { Board } from './Board';
import { JoinGame } from './JoinGame';
import { FinishedOverlay, InactiveOverlay } from './Overlays';
import { PhaseChangeNotice } from './PhaseChangeNotice';
import { TurnOrder } from './PlayersList';
import { PlayersList } from './PlayersList/PlayersList';

export const Game: React.FC = () => {
  useInjectReducer({
    key: 'dixthis',
    reducer: reducer,
  });
  const history = useHistory();
  const gameId = useGameId();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const client = new WebSocket(
      `${process.env.REACT_APP_SOCKET_URL}/dixthis/${gameId}`,
    );
    client.addEventListener('message', e => {
      if (!e.data) {
        client.close();
        return;
      }
      const game: TGame = JSON.parse(e.data);
      dispatch(actions.receiveGame(game));
    });
    client.addEventListener('close', e => {
      dispatch(actions.receiveGame(null));
      history.push('/dixthis');
    });
    return () => {
      client.close();
    };
    // eslint-disable-next-line
  }, []);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    dispatch(
      snackbar.showSnackbar({
        className: 'primary',
        gameName: 'dixthis',
        message: 'Copied!',
      }),
    );
  };

  const game = useSelector(selectGame);

  if (!game) return <LoadingIndicator />;

  return (
    <div className="dixthis h-full lg:flex relative">
      <section
        className="w-full lg:h-full lg:w-2/3 xl:w-3/4 p-4 relative pl-24 sm:pl-32"
        style={{ minHeight: '300px' }}
      >
        {game.state === 'inactive' && <InactiveOverlay />}
        {game.state === 'over' && <FinishedOverlay />}
        {(game.state === 'active' || game.state === 'over') && <Board />}
      </section>
      <section className="w-full lg:w-1/3 xl:w-1/4 p-4 flex flex-col justify-between">
        <PlayersList />
        <div>
          {game.state === 'active' && <TurnOrder />}
          <div className="my-4">
            <h3 className="text-dixthis-error-main">
              <Tooltip
                title={t(translations.dixthis.game.scoringInfo) as string}
              >
                <InfoCircle className="inline mr-1" />
              </Tooltip>
              <span className="whitespace-no-wrap">
                {t(translations.dixthis.game.pointsToWin)} :{' '}
                {game.pointsToWin ||
                  t(translations.dixthis.game.untilDeckEmpty)}
              </span>
              <span className="mx-2">/</span>
              <span className="whitespace-no-wrap">
                {t(translations.dixthis.game.cardsRemaining)} :{' '}
                {t(translations.dixthis.game.cardCount, {
                  number: game.deck.length,
                })}
              </span>
            </h3>
          </div>
          <Button
            variant="grey"
            size="small"
            onClick={copyLink}
            gameName="dixthis"
          >
            {t(translations.game.copyLink)}
          </Button>
          <JoinGame />
        </div>
      </section>
      <PhaseChangeNotice />
    </div>
  );
};
