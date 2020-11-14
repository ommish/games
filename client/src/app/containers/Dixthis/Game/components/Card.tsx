import React, {
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from 'react';
import { CheckCircleFill } from 'react-bootstrap-icons';
import { CardHoverContext } from './CardList';

type Props = {
  card: string;
  selected?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

const getClasses = (selected: boolean, hovered: boolean) =>
  `game-card mr-4 my-2 bg-white flex items-center justify-center rounded-lg shadow-md ${
    selected ? 'border-2 border-dixthis-primary-main shadow-sm' : ''
  } ${hovered ? 'hover' : ''}`;

const selectedIcon = (
  <CheckCircleFill className="text-white absolute top-50 left-50 text-6xl opacity-75" />
);

export const Card: React.FC<Props> = ({ card, selected, onClick }) => {
  const img = (
    <img
      src={`https://storage.googleapis.com/dixthis/cards/${card}`}
      alt="card"
      className="max-h-full max-w-full"
    />
  );
  const { hovered, setHovered } = useContext(CardHoverContext);
  const timerRef = useRef<NodeJS.Timeout>();
  const onEnter = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setHovered(card);
    }, 600);
    // eslint-disable-next-line
  }, []);
  const onLeave = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setHovered(null);
    // eslint-disable-next-line
  }, []);
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);
  if (onClick) {
    return (
      <button
        type="button"
        className={getClasses(!!selected, hovered === card)}
        onClick={onClick}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
      >
        {img}
        {selected && selectedIcon}
      </button>
    );
  }
  return (
    <div
      className={getClasses(!!selected, hovered === card)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {img}
      {selected && selectedIcon}
    </div>
  );
};
