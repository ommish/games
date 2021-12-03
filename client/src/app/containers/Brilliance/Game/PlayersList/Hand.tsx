import React from 'react';
import { RESOURCE_TYPES } from '../../constants';
import { tokensToColor } from '../../styles';
import { Card, Resource as ResourceT } from '../../types';

type Props = {
  hand: Card[];
  reserved?: boolean;
};

export const Hand: React.FC<Props> = ({ hand, reserved }) => {
  return (
    <div className="flex flex-wrap gap-x-2">
      {RESOURCE_TYPES.map(resource => (
        <Resource
          key={resource}
          resource={resource}
          cards={hand}
          reserved={!!reserved}
        />
      ))}
    </div>
  );
};

type ResourceProps = { cards: Card[]; resource: ResourceT; reserved: boolean };
const Resource: React.FC<ResourceProps> = ({ cards, resource, reserved }) => {
  const resourceCards = cards.filter(card => card.resource === resource);
  if (!resourceCards.length) {
    return null;
  }
  return (
    <div
      className="flex gap-x-2 justify-center items-center border-4 rounded-sm text-lg font-semibold"
      style={{
        borderColor: tokensToColor(resource),
        color: tokensToColor(resource),
        width: '28px',
        height: '28px',
        transform: reserved ? 'rotate(90deg)' : '',
        opacity: reserved ? 0.5 : 1,
      }}
    >
      {resourceCards.length}
    </div>
  );
};
