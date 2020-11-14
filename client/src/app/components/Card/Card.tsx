import { CSSProperties } from '@material-ui/core/styles/withStyles';
import React from 'react';

type Props = {
  className?: string;
  style?: CSSProperties;
};
export const Card: React.FC<Props> = props => (
  <div
    className={`rounded-lg shadow-sm px-4 py-2 ${props.className || ''}`}
    style={props.style}
  >
    {props.children}
  </div>
);
