import React from 'react';

type Props = {
  name: string;
};

export const Label: React.FC<Props> = props => {
  return <label htmlFor={props.name}>{props.children}</label>;
};
