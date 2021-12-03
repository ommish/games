import React from 'react';
import { pointsImage } from '../../styles';

type Props = {
  points: number;
};

export const Points: React.FC<Props> = ({ points }) => {
  if (!points) {
    return <div />;
  }
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundImage: `url('${pointsImage()}')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'none',
      }}
      className="font-semibold text-brilliance-primary-main text-xl flex justify-center items-center"
    >
      <div
        style={{
          marginTop: '3px',
        }}
      >
        {points}
      </div>
    </div>
  );
};
