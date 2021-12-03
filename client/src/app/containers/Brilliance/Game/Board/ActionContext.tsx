import { actions as snackbar } from 'app/containers/Snackbar/state/slice';
import { translations } from 'locales/i18n';
import React, { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { request } from 'utils/request';
import {
  selectActivePlayer,
  selectGame,
  selectPlayer,
} from '../../state/selectors';
import { actions } from '../../state/slice';
import { CardLevel, Game, Resource, Token } from '../../types';

export const STEPS = {
  'take-tokens': ['draw', 'discard', 'confirm'],
  'purchase-card': ['card', 'tokens', 'confirm'],
  'reserve-card': ['card', 'discard', 'confirm'],
} as const;

export type Action =
  | {
      type: null;
    }
  | {
      type: 'take-tokens';
      draw: null | Partial<Record<Resource, 1 | 2>>;
      discard: null | Partial<Record<Resource | Token, 1 | 2>>;
      step: typeof STEPS['take-tokens'][number];
    }
  | {
      type: 'purchase-card';
      source: null | CardLevel | 'reserve';
      index: null | number;
      tokens: null | Partial<Record<Resource | Token, number>>;
      step: typeof STEPS['purchase-card'][number];
    }
  | {
      type: 'reserve-card';
      level: null | CardLevel;
      index: null | number;
      discard: null | Token;
      step: typeof STEPS['reserve-card'][number];
    };

export const ActionContext = React.createContext<{
  isActive: boolean;
  action: Action;
  setAction: (action: Action) => void;
  undo: () => void;
  submit: () => Promise<void>;
}>({
  isActive: false,
  action: { type: null },
  setAction: () => {},
  undo: () => {},
  submit: () => Promise.resolve(),
});

export const ActionProvider: React.FC = ({ children }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [action, setAction] = useState<Action>({
    type: null,
  });
  const activePlayer = useSelector(selectActivePlayer);
  const user = useSelector(selectPlayer);
  useEffect(() => {
    setAction({ type: null });
  }, [activePlayer, user]);

  const undo = useCallback(() => {
    if (!action.type) {
      return;
    }
    const actionSteps = STEPS[action.type];
    // @ts-ignore
    const index = actionSteps.indexOf(action.step);
    if (index === 0) {
      setAction({ type: null });
    } else {
      setAction({
        ...action,
        type: action.type,
        step: actionSteps[index - 1],
        ...actionSteps
          .slice(index)
          // @ts-ignore
          .reduce((acc, step) => ({ ...acc, [step]: null }), {}),
      });
    }
  }, [action]);

  const game = useSelector(selectGame);

  const submit = useCallback(async () => {
    if (
      !user ||
      user.name !== activePlayer?.name ||
      !action.type ||
      action.step !== 'confirm'
    ) {
      return;
    }
    try {
      const res = await request<{
        game: Game;
        playerName: string;
      }>(`/brilliance/${game?.id}/players/${user.name}/turn`, {
        method: 'PUT',
        body: JSON.stringify(action),
      });
      dispatch(actions.receiveGame(res.game));
    } catch (err) {
      dispatch(
        snackbar.showSnackbar({
          className: 'error',
          gameName: 'brilliance',
          message: err.message || t(translations.brilliance.errors.turn),
        }),
      );
    }
    // eslint-disable-next-line
  }, [action, game]);

  return (
    <ActionContext.Provider
      value={{
        isActive: activePlayer?.name === user?.name,
        action,
        setAction,
        undo,
        submit,
      }}
    >
      {children}
    </ActionContext.Provider>
  );
};
