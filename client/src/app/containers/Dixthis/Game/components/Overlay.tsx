import React from 'react';

export const Overlay: React.FC = props => {
  return (
    <div className="absolute top-0 left-0 z-10 bg-white bg-opacity-75 h-full w-full flex flex-col items-center justify-center">
      {props.children}
    </div>
  );
};
