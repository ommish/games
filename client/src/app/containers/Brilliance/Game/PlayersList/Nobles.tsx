import React from 'react';
import { FilePersonFill } from 'react-bootstrap-icons';
import { tokensToColor } from '../../styles';
import { Noble } from '../../types';

type Props = {
  nobles: Noble[];
};

export const Nobles: React.FC<Props> = ({ nobles }) => {
  return (
    <div className="flex flex-wrap gap-x-2">
      {nobles.map((noble, i) => (
        <FilePersonFill key={i} size="32" fill={tokensToColor('gold')} />
      ))}
    </div>
  );
};
