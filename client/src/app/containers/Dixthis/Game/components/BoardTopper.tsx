import React from 'react';

export const BoardTopper: React.FC = ({ children }) => {
  return (
    <div
      className="md:flex items-center justify-between"
      style={{ minHeight: '124px' }}
    >
      {children}
    </div>
  );
};
