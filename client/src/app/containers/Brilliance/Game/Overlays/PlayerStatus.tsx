import { Dialog } from '@material-ui/core';
import { Divider } from 'app/components/Divider';
import React from 'react';
import { useSelector } from 'react-redux';
import { RESOURCE_TYPES } from '../../constants';
import { selectGame } from '../../state/selectors';
import { tokensToColor } from '../../styles';
import {
  Card as CardT,
  Noble as NobleT,
  Resource as ResourceT,
} from '../../types';
import { Card, EmptyState, Noble, PlayerName, Tokens } from '../components';

type Props = { playerName: string | null; onClose: () => void };

export const PlayerStatus: React.FC<Props> = ({ playerName, onClose }) => {
  const game = useSelector(selectGame);
  if (!game) {
    return null;
  }
  const player = game.players.find(player => player.name === playerName);
  return (
    <Dialog open={!!player} onClose={onClose} fullWidth maxWidth="md">
      {player && (
        <>
          <PlayerName player={player} />
          <Divider />
          <Tokens tokens={player.purse} size="s" />
          <Divider />
          <Cards cards={player.hand} />
          <Divider />
          <Nobles nobles={player.nobles} />
          <Divider />
          <Reserve cards={player.reserve} />
        </>
      )}
    </Dialog>
  );
};

type CardsProps = { cards: CardT[] };
const Cards: React.FC<CardsProps> = ({ cards }) => {
  return (
    <Row>
      {cards.length ? (
        RESOURCE_TYPES.map(resource => (
          <Resource key={resource} resource={resource} cards={cards} />
        ))
      ) : (
        <EmptyState category="cards" />
      )}
    </Row>
  );
};

type ResourceProps = { cards: CardT[]; resource: ResourceT };
const Resource: React.FC<ResourceProps> = ({ cards, resource }) => {
  const resourceCards = cards.filter(card => card.resource === resource);
  if (!resourceCards.length) {
    return null;
  }
  return (
    <div
      className="p-4 border rounded-md"
      style={{ borderColor: tokensToColor(resource) }}
    >
      <Row>
        {resourceCards.map((card, i) => (
          <Card key={i} card={card} partial />
        ))}
      </Row>
    </div>
  );
};

type NoblesProps = { nobles: NobleT[] };
const Nobles: React.FC<NoblesProps> = ({ nobles }) => {
  return nobles.length ? (
    <div className="p-4 my-4 border border-gray-300 rounded-md">
      <Row>
        {nobles.map((noble, i) => (
          <Noble key={i} noble={noble} />
        ))}
      </Row>
    </div>
  ) : (
    <EmptyState category="nobles" />
  );
};

type ReserveProps = { cards: CardT[] };
const Reserve: React.FC<ReserveProps> = ({ cards }) => {
  return cards.length ? (
    <Row>
      {cards.map((card, i) => (
        <Card key={i} card={card} reserved />
      ))}
    </Row>
  ) : (
    <EmptyState category="reserve" />
  );
};

const Row: React.FC = ({ children }) => {
  return <div className="w-full flex flex-wrap gap-x-2">{children}</div>;
};
