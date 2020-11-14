import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { Game } from './Game';
import { HomePage } from './HomePage';

export function Routes() {
  return (
    <>
      <Helmet titleTemplate="%s - DixThis" defaultTitle="DixThis"></Helmet>
      <Switch>
        <Route exact path="/dixthis/:gameId" component={Game} />
        <Route exact path="/dixthis" component={HomePage} />
      </Switch>
    </>
  );
}
