import { LoadingIndicator } from 'app/components/LoadingIndicator';
import React, { ReactNode, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useInjectReducer } from 'utils/redux-injectors';
import { useGameId } from '../hooks';
import {
  selectActivePlayer,
  selectGame,
  selectPlayer,
} from '../state/selectors';
import { actions, reducer } from '../state/slice';
import { Game as TGame } from '../types';
import { FinishedNotice } from './FinishedNotice';
import { InactiveOverlay } from './Overlays';
import { Path } from './Path';
import { PhaseChangeNotice } from './PhaseChangeNotice';
import { PlayersList } from './Player';
import { HandleSpace, RollDice, SelectDirection } from './Prompts';
import { WaterTracker } from './WaterTracker';

export const Game: React.FC = () => {
  useInjectReducer({
    key: 'desertAdventure',
    reducer: reducer,
  });
  const history = useHistory();
  const gameId = useGameId();
  const dispatch = useDispatch();

  useEffect(() => {
    const client = new WebSocket(
      `${process.env.REACT_APP_SOCKET_URL}/desert-adventure/${gameId}`,
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
      history.push('/desert-adventure');
    });
    return () => {
      client.close();
    };
    // eslint-disable-next-line
  }, []);

  const game = useSelector(selectGame);
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectPlayer);

  let prompt: ReactNode = null;
  switch (game?.phase) {
    case 'select-direction':
      prompt = <SelectDirection />;
      break;
    case 'roll-dice':
      prompt = <RollDice />;
      break;
    case 'handle-space':
      prompt = <HandleSpace />;
      break;
    default:
      prompt = null;
      break;
  }

  if (!game) return <LoadingIndicator />;

  return (
    <div className="desert">
      <InactiveOverlay />
      <section className="w-full">
        {game.state === 'over' ? <FinishedNotice /> : <WaterTracker />}
      </section>
      {game.state === 'active' && user && activePlayer?.name === user.name && (
        <section className="w-full p-8">{prompt}</section>
      )}
      <section className="w-full p-8">
        <Path />
      </section>
      {game.state !== 'inactive' && (
        <section className="w-full p-8">
          <PlayersList />
        </section>
      )}
      <PhaseChangeNotice />
    </div>
  );
};
