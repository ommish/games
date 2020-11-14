import React, { useState } from 'react';

export const CardHoverContext = React.createContext<{
  hovered: null | string;
  setHovered: (hovered: null | string) => void;
}>({
  hovered: null,
  setHovered: hovered => undefined,
});

export const CardList: React.FC = props => {
  const [hovered, setHovered] = useState<string | null>(null);
  return (
    <div className="flex flex-wrap">
      <CardHoverContext.Provider value={{ hovered, setHovered }}>
        {props.children}
      </CardHoverContext.Provider>
    </div>
  );
};
