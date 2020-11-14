import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bg } from 'styles/util';
import { GameName } from 'types';
import { LanguageSwitch } from '../LanguageSwitch';
import { HomeLink } from './HomeLink';

export const Footer: React.FC<RouteComponentProps> = ({ match }) => {
  let gameName: GameName | null = null;
  if (match.url.startsWith('/dixthis')) {
    gameName = 'dixthis';
  } else if (match.url.startsWith('/desert-adventure')) {
    gameName = 'desert-adventure';
  }
  return (
    <div
      className={`h-full w-full flex items-center justify-between px-4 text-error-main ${bg(
        gameName,
        'error',
        'extraLight',
      )}`}
    >
      <HomeLink />
      <LanguageSwitch />
    </div>
  );
};
