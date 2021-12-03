import * as t from 'io-ts';

export const Resource = t.union([
  t.literal('diamond'),
  t.literal('sapphire'),
  t.literal('ruby'),
  t.literal('emerald'),
  t.literal('chocolate'),
]);
export type Resource = t.TypeOf<typeof Resource>;

export const Token = t.union([Resource, t.literal('gold')]);
export type Token = t.TypeOf<typeof Token>;

export const CardLevel = t.union([t.literal(1), t.literal(2), t.literal(3)]);
export type CardLevel = t.TypeOf<typeof CardLevel>;

export const Card = t.type({
  level: CardLevel,
  resource: Resource,
  points: t.number,
  cost: t.partial({
    chocolate: t.number,
    emerald: t.number,
    sapphire: t.number,
    diamond: t.number,
    ruby: t.number,
  }),
  image: t.string,
});
export type Card = t.TypeOf<typeof Card>;

export type Deck = Record<CardLevel, Card[]>;

export const Noble = t.type({
  image: t.string,
  points: t.number,
  cost: t.partial({
    chocolate: t.number,
    emerald: t.number,
    sapphire: t.number,
    diamond: t.number,
    ruby: t.number,
  }),
});
export type Noble = t.TypeOf<typeof Noble>;

export type CardPoolSize = 4;

export type CardPool = Record<CardLevel, Card[]>;

export type TokenPool = Record<Token, number>;

export type Player = {
  name: string;
  hand: Card[];
  reserve: Card[];
  nobles: Noble[];
  purse: TokenPool;
};

export type Game = {
  id: string;
  players: Player[];
  state: 'active' | 'inactive' | 'over';
  currentPlayer: number;
  deck: Deck;
  cardPool: CardPool;
  tokenPool: TokenPool;
  noblePool: Noble[];
  nextRoundAt?: number;
  updatedAt?: string;
};

export type Action = 'take-tokens' | 'reserve-card' | 'purchase-card';

export const TakeTokensAction = t.type({
  type: t.literal('take-tokens'),
  draw: t.partial({
    chocolate: t.union([t.literal(1), t.literal(2)]),
    emerald: t.union([t.literal(1), t.literal(2)]),
    sapphire: t.union([t.literal(1), t.literal(2)]),
    diamond: t.union([t.literal(1), t.literal(2)]),
    ruby: t.union([t.literal(1), t.literal(2)]),
  }),
  discard: t.partial({
    chocolate: t.union([t.literal(1), t.literal(2), t.literal(3)]),
    emerald: t.union([t.literal(1), t.literal(2), t.literal(3)]),
    sapphire: t.union([t.literal(1), t.literal(2), t.literal(3)]),
    diamond: t.union([t.literal(1), t.literal(2), t.literal(3)]),
    ruby: t.union([t.literal(1), t.literal(2), t.literal(3)]),
    gold: t.union([t.literal(1), t.literal(2), t.literal(3)]),
  }),
});
export type TakeTokensAction = t.TypeOf<typeof TakeTokensAction>;

export const PurchaseCardAction = t.type({
  type: t.literal('purchase-card'),
  source: t.union([CardLevel, t.literal('reserve')]),
  index: t.number,
  tokens: t.partial({
    chocolate: t.number,
    emerald: t.number,
    sapphire: t.number,
    diamond: t.number,
    ruby: t.number,
    gold: t.number,
  }),
});
export type PurchaseCardAction = t.TypeOf<typeof PurchaseCardAction>;

export const ReserveCardAction = t.type({
  type: t.literal('reserve-card'),
  level: CardLevel,
  index: t.number,
  discard: t.union([Token, t.null]),
});
export type ReserveCardAction = t.TypeOf<typeof ReserveCardAction>;
