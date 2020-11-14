import { useRouteMatch } from 'react-router-dom';

export function useGameId() {
  const match = useRouteMatch<{ gameId: string }>('/desert-adventure/:gameId');
  return match?.params.gameId;
}
