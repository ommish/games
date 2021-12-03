import { Button } from 'app/components/Button';
import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { translations } from 'locales/i18n';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { selectGame, selectPlayer, selectPlayers } from '../../state/selectors';
import { sumPoints } from '../../utils';
import { PlayerName, Points } from '../components';
import { PlayerStatus } from '../Overlays';
import { Hand } from './Hand';
import { JoinAsPlayer } from './JoinAsPlayer';
import { JoinGame } from './JoinGame';
import { Nobles } from './Nobles';
import { Purse } from './Purse';
import { RemovePlayer } from './RemovePlayer';

type Props = {
  compact?: boolean;
};
export const PlayersList: React.FC<Props> = props => {
  const { t } = useTranslation();
  const game = useSelector(selectGame);
  const user = useSelector(selectPlayer);
  const players = useSelector(selectPlayers);
  const dispatch = useDispatch();
  const [playerDialog, setPlayerDialog] = useState<string | null>(null);

  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    dispatch(
      snackbar.showSnackbar({
        className: 'primary',
        gameName: 'brilliance',
        message: 'Copied!',
      }),
    );
  };

  if (!game) return null;

  return (
    <div className="px-1">
      <ul>
        {players?.map((player, i) => (
          <li key={player.name} className="w-full p-2 border-b-2 max-w-xl">
            <div className="flex justify-between font-bold">
              {props.compact ? (
                <PlayerName player={player} />
              ) : (
                <button
                  type="button"
                  onClick={() => setPlayerDialog(player.name)}
                >
                  <PlayerName player={player} />
                </button>
              )}
              {user ? (
                <RemovePlayer playerName={player.name} />
              ) : (
                <JoinAsPlayer player={player.name} />
              )}
            </div>
            <div className="grid grid-cols-1 gap-y-1">
              {!props.compact && (
                <>
                  <Points points={sumPoints(player)} />
                  <Purse purse={player.purse} />
                  <Hand hand={player.hand} />
                  <Nobles nobles={player.nobles} />
                  <Hand hand={player.reserve} reserved />
                </>
              )}
            </div>
          </li>
        ))}
      </ul>
      <Button
        className="mt-4"
        variant="grey"
        size="small"
        onClick={copyLink}
        gameName="brilliance"
      >
        {t(translations.game.copyLink)}
      </Button>
      <JoinGame />
      <PlayerStatus
        playerName={playerDialog}
        onClose={() => setPlayerDialog(null)}
      />
    </div>
  );
};
