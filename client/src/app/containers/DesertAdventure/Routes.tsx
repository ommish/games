import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Route, Switch } from 'react-router-dom';
import { Game } from './Game';
import { HomePage } from './HomePage';

export function Routes() {
  return (
    <>
      <Helmet
        titleTemplate="%s - Desert Adventure"
        defaultTitle="Desert Adventure"
      ></Helmet>
      <Switch>
        <Route exact path="/desert-adventure/:gameId" component={Game} />
        <Route exact path="/desert-adventure" component={HomePage} />
      </Switch>
    </>
  );
}
