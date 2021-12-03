import { LoadingIndicator } from 'app/components/LoadingIndicator';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useInjectReducer } from 'utils/redux-injectors';
import { BRILLIANCE } from '../constants';
import { useGameId } from '../hooks';
import { selectGame } from '../state/selectors';
import { actions, reducer } from '../state/slice';
import { Game as TGame } from '../types';
import { Board } from './Board';
import { FinishedNotice } from './FinishedNotice';
import { InactiveOverlay } from './Overlays';
import { PlayersList } from './PlayersList';
import { TurnChangeNotice } from './TurnChangeNotice';

export const Game: React.FC = () => {
  useInjectReducer({
    key: BRILLIANCE,
    reducer: reducer,
  });
  const history = useHistory();
  const gameId = useGameId();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const client = new WebSocket(
      `${process.env.REACT_APP_SOCKET_URL}/${BRILLIANCE}/${gameId}`,
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
      history.push(`/${BRILLIANCE}`);
    });
    return () => {
      client.close();
    };
    // eslint-disable-next-line
  }, []);

  const game = useSelector(selectGame);

  if (!game) return <LoadingIndicator />;

  return (
    <div className="brilliance h-full lg:flex">
      <section className="w-full lg:w-3/4" style={{ minHeight: '300px' }}>
        {game.state === 'inactive' && <InactiveOverlay />}
        {game.state === 'over' && <FinishedNotice />}
        <Board />
      </section>
      <section className="w-full lg:w-1/4 flex flex-col justify-between">
        <PlayersList />
      </section>
      <TurnChangeNotice />
    </div>
  );
};
