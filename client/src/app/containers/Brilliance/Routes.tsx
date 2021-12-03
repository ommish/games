import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { Game } from './Game';
import { HomePage } from './HomePage';

export function Routes() {
  return (
    <>
      <Helmet
        titleTemplate="%s - Brilliance"
        defaultTitle="Brilliance"
      ></Helmet>
      <Switch>
        <Route exact path="/brilliance/:gameId" component={Game} />
        <Route exact path="/brilliance" component={HomePage} />
      </Switch>
    </>
  );
}
