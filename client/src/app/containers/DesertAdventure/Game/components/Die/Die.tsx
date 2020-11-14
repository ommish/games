import React from 'react';
import { DieValue } from '../../../types';

type Props = {
  roll: DieValue | 0;
  onClick?: () => void;
};

const style = {
  height: '60px',
  width: '60px',
  backgroundSize: 'cover',
};

export const Die: React.FC<Props> = props => {
  if (props.onClick && props.roll === 0) {
    return (
      <button
        type="button"
        onClick={props.onClick}
        disabled={!!props.roll}
        className="mr-2"
        style={{
          ...style,
          backgroundImage: `url('/desert-adventure/roll-unknown.svg')`,
        }}
      ></button>
    );
  }

  return (
    <div
      className="mr-2"
      style={{
        ...style,
        backgroundImage: `url('${getBG(props.roll)}')`,
      }}
    ></div>
  );
};

function getBG(roll: Props['roll']) {
  switch (roll) {
    case 0:
      return '/desert-adventure/roll-unknown.svg';
    case 1:
      return '/desert-adventure/roll-1.svg';
    case 2:
      return '/desert-adventure/roll-2.svg';
    case 3:
      return '/desert-adventure/roll-3.svg';
  }
}
