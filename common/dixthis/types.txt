export const playerTitles = [
  'presidentElect',
  'queen',
  'terrible',
  'twentyFourth',
  'prince',
  'emperor',
  'conqueror',
  'unbroken',
  'lady',
  'shire',
  'newJersey',
  'rulerOfGondor',
  'jediMaster',
  'cheeseEater',
  'fartConnoisseur',
  'allNatural',
  'firstOfHerName',
  'championOfSun',
  'lil',
  'reverendDoctor',
  'hufflepuff',
  'goldMedalist',
  'blueEyesWhite',
  'cantBelieve',
  'hannahMontana',
  'greatIni',
  'thatsSo',
] as const;

export type Title = typeof playerTitles[number];

export type Player = {
  name: string;
  hand: Card[];
  points: number;
  title: Title;
};

export type Card = string;

export type Hand = Card[];

export type PoolItem = {
  card: string;
  player: string;
  original?: boolean;
};

export type Game = {
  id: string;
  players: Player[];
  state: 'active' | 'inactive' | 'over';
  phase:
    | 'selecting-hint'
    | 'submitting-cards'
    | 'guessing-original'
    | 'distributing-points';
  onDeck: {
    name: string;
    index: number;
  };
  hint: string | null;
  pool: PoolItem[];
  guesses: {
    card: string;
    player: string;
  }[];
  deck: Card[];
  nextRoundAt?: number;
  updatedAt?: string;
  pointsToWin: number | null;
};
