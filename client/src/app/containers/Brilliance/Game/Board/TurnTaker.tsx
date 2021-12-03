import { Button } from 'app/components/Button';
import { translations } from 'locales/i18n';
import React, { useContext } from 'react';
import { ArrowCounterclockwise } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { Action } from '../../types';
import { ActionContext } from './ActionContext';

export const TurnTaker: React.FC = () => {
  const { isActive, action } = useContext(ActionContext);

  if (!isActive) {
    return null;
  }

  return (
    <div className="p-2">
      <Header />
      <Message />
      {!action.type && <ActionPicker />}
    </div>
  );
};

const Header: React.FC = () => {
  const { t } = useTranslation();
  const { action, undo } = useContext(ActionContext);
  return (
    <h1 className="flex items-center">
      <span className="mr-2">{t(actionTypes[action.type || ''])}</span>
      {action.type && (
        <Button gameName="brilliance" variant="grey" onClick={undo}>
          <ArrowCounterclockwise />
        </Button>
      )}
    </h1>
  );
};

const Message: React.FC = () => {
  const { t } = useTranslation();
  const { action } = useContext(ActionContext);
  if (!action.type) {
    return null;
  }
  return (
    <div className="">
      {t(
        action.step === 'confirm'
          ? translations.brilliance.action.confirm
          : translations.brilliance[action.type][action.step],
      )}
    </div>
  );
};

const ActionPicker: React.FC = () => {
  const { setAction } = useContext(ActionContext);
  const { t } = useTranslation();

  return (
    <div className="flex gap-x-2">
      <Button
        gameName="brilliance"
        onClick={() => setAction(initialActions['take-tokens'])}
      >
        {t(actionTypes['take-tokens'])}
      </Button>
      <Button
        gameName="brilliance"
        onClick={() => setAction(initialActions['purchase-card'])}
      >
        {t(actionTypes['purchase-card'])}
      </Button>
      <Button
        gameName="brilliance"
        onClick={() => setAction(initialActions['reserve-card'])}
      >
        {t(actionTypes['reserve-card'])}
      </Button>
    </div>
  );
};

const actionTypes: Record<Action | '', string> = {
  '': translations.brilliance.action.selectAction,
  'take-tokens': translations.brilliance.action.takeTokens,
  'purchase-card': translations.brilliance.action.purchaseCard,
  'reserve-card': translations.brilliance.action.reserveCard,
};
const actionMessages: Record<Action, string> = {
  'take-tokens': translations.brilliance.action.takeTokens,
  'purchase-card': translations.brilliance.action.purchaseCard,
  'reserve-card': translations.brilliance.action.reserveCard,
};

const initialActions = {
  'take-tokens': {
    type: 'take-tokens',
    step: 'draw',
    draw: null,
    discard: null,
  },
  'purchase-card': {
    type: 'purchase-card',
    step: 'card',
    source: null,
    index: null,
    tokens: null,
  },
  'reserve-card': {
    type: 'reserve-card',
    step: 'card',
    level: null,
    index: null,
    discard: null,
  },
} as const;
