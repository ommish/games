/**
 * index.tsx
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import { ThemeProvider } from '@material-ui/core/styles';
import { App } from 'app';
import FontFaceObserver from 'fontfaceobserver';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as ReactDOM from 'react-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import 'sanitize.css/sanitize.css';
import * as serviceWorker from 'serviceWorker';
import { configureAppStore } from 'store/configureStore';
// Initialize languages
import './locales/i18n';
import { theme } from './styles/mui';
import './styles/tailwind.output.scss';

// Observe loading of font
const openSansObserver = new FontFaceObserver('Catamaran', {});

// When Catamaran is loaded, add a font-family using Catamaran to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
});

const store = configureAppStore();
const MOUNT_NODE = document.getElementById('root') as HTMLElement;

interface Props {
  Component: typeof App;
}
const ConnectedApp = ({ Component }: Props) => (
  <Provider store={store}>
    <HelmetProvider>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <Component />
        </React.StrictMode>
      </ThemeProvider>
    </HelmetProvider>
  </Provider>
);

const render = (Component: typeof App) => {
  ReactDOM.render(<ConnectedApp Component={Component} />, MOUNT_NODE);
};

if (module.hot) {
  // Hot reloadable translation json files and app
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./app', './locales/i18n'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    const App = require('./app').App;
    render(App);
  });
}

render(App);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
