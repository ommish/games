import { Tooltip } from '@material-ui/core';
import { translations } from 'locales/i18n';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectGameState } from '../../../state/selectors';
import { Treasure as TTreasure } from '../../../types';

type Props = {
  treasure: TTreasure | null;
  count: number;
};

const getSize = (count: number) =>
  count === 1 ? '60px' : count === 2 ? '50px' : '40px';
const getFontSize = (count: number) =>
  count === 1 ? 'text-4xl' : count === 2 ? 'text-3xl' : 'text-2xl';

export const Treasure: React.FC<Props> = props => {
  const { t } = useTranslation();
  const state = useSelector(selectGameState);
  const revealPoints = state === 'over';
  return (
    <Tooltip
      title={
        props.treasure
          ? (t(translations.desertAdventure.path.pointRange, {
              min: (props.treasure.level - 1) * 4,
              max: (props.treasure.level - 1) * 4 + 3,
            }) as string)
          : ''
      }
    >
      <div
        className={`flex-shrink text-white flex items-center justify-center ${getFontSize(
          props.count,
        )}`}
        style={{
          height: getSize(props.count),
          width: getSize(props.count),
          minHeight: getSize(props.count),
          minWidth: getSize(props.count),
          backgroundSize: 'cover',
          backgroundImage: `url('${getBG(
            props.treasure?.level || null,
            revealPoints ? props.treasure?.points : undefined,
          )}')`,
        }}
      >
        {revealPoints && props.treasure?.points}
      </div>
    </Tooltip>
  );
};

function getBG(level: TTreasure['level'] | null, points?: number) {
  switch (level) {
    case null:
      return `/desert-adventure/treasure-empty.svg`;
    case 1:
      return points === undefined
        ? `/desert-adventure/level-${1}.svg`
        : `/desert-adventure/level-${1}-blank.svg`;
    case 2:
      return points === undefined
        ? `/desert-adventure/level-${2}.svg`
        : `/desert-adventure/level-${2}-blank.svg`;
    case 3:
      return points === undefined
        ? `/desert-adventure/level-${3}.svg`
        : `/desert-adventure/level-${3}-blank.svg`;
    case 4:
      return points === undefined
        ? `/desert-adventure/level-${4}.svg`
        : `/desert-adventure/level-${4}-blank.svg`;
  }
}
