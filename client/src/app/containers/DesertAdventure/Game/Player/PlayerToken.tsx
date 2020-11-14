import { Tooltip } from '@material-ui/core';
import { translations } from 'locales/i18n';
import React from 'react';
import {
  ArrowLeft,
  ArrowRight,
  EmojiDizzy,
  EmojiFrown,
  EmojiLaughing,
  EmojiNeutral,
  EmojiSunglasses,
} from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectGame, selectPlayer } from '../../state/selectors';
import { Color, Player } from '../../types';
import { COLORS } from './constants';

type Props = {
  player: Player;
  row?: number;
};

export const PlayerToken: React.FC<Props> = ({ player, row = 0 }) => {
  const game = useSelector(selectGame);
  const user = useSelector(selectPlayer);
  const { t } = useTranslation();

  if (!game) return null;

  let className = 'bg-white text-2xl rounded-2xl';
  if (
    game.state === 'active' &&
    game.players[game.activePlayer].name === player.name
  ) {
    className += ' text-4xl';
  }
  let Icon;
  switch (true) {
    case player.position < 0: {
      Icon = EmojiSunglasses;
      break;
    }
    case game.water <= 5: {
      Icon = player.position <= 4 ? EmojiFrown : EmojiDizzy;
      break;
    }
    case game.water <= 10: {
      Icon = player.position <= 6 ? EmojiNeutral : EmojiFrown;
      break;
    }
    case game.water <= 15: {
      Icon = player.position <= 8 ? EmojiLaughing : EmojiNeutral;
      break;
    }
    case game.water > 15: {
      Icon = player.position <= 10 ? EmojiSunglasses : EmojiLaughing;
      break;
    }
    default:
      throw new Error(`I fucked up`);
  }
  return (
    <Tooltip
      title={`${player.name} ${
        player.name === user?.name
          ? (t(translations.desertAdventure.players.you) as string)
          : ''
      }`}
    >
      <div className="flex flex-col items-center">
        <Icon className={className} color={COLORS[player.color]} />
        {directionArrow(player.returning, row, player.color)}
      </div>
    </Tooltip>
  );
};

function directionArrow(returning: boolean, row: number, color: Color) {
  const props = { color: COLORS[color] };
  if (returning) {
    return row % 2 === 0 ? <ArrowLeft {...props} /> : <ArrowRight {...props} />;
  }
  return row % 2 === 0 ? <ArrowRight {...props} /> : <ArrowLeft {...props} />;
}
