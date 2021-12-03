/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { Routes as BrillianceRoutes } from './containers/Brilliance/Routes';
import { Routes as DesertAdventureRoutes } from './containers/DesertAdventure/Routes';
import { Routes as DixthisRoutes } from './containers/Dixthis/Routes';
import { Footer } from './containers/Footer';
import { GameList } from './containers/Home';
import { Snackbar } from './containers/Snackbar';

export function App() {
  return (
    <BrowserRouter>
      <Helmet titleTemplate="%s - ommigames" defaultTitle="ommigames">
        <meta name="description" content="Games by Ommi" />
      </Helmet>
      <main style={{ height: 'calc(100% - 36px', overflowY: 'auto' }}>
        <Switch>
          <Route path="/dixthis" component={DixthisRoutes} />
          <Route path="/desert-adventure" component={DesertAdventureRoutes} />
          <Route path="/brilliance" component={BrillianceRoutes} />
          <Route exact path="/" component={GameList} />
          <Route path="/" render={() => <Redirect to="/" />} />
        </Switch>
      </main>
      <div style={{ height: '36px' }}>
        <Switch>
          <Route path="/dixthis" component={Footer} />
          <Route path="/desert-adventure" component={Footer} />
          <Route path="/brilliance" component={Footer} />
          <Route path="/" component={Footer} />
        </Switch>
      </div>
      <Snackbar />
    </BrowserRouter>
  );
}
