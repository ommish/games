import { useRouteMatch } from 'react-router-dom';

export function useGameId() {
  const match = useRouteMatch<{ gameId: string }>('/dixthis/:gameId');
  return match?.params.gameId;
}
