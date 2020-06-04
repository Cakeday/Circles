import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app/App';
import * as serviceWorker from './serviceWorker';

import { Provider } from 'react-redux'
import setUpStore from './app/store'

import { checkLoggedIn } from "./util/session";

const render = (preloadedState) => {
  const store = setUpStore(preloadedState)
  ReactDOM.render(
    // <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>,
    // </React.StrictMode>,
    document.getElementById('root'),
  window.getState = store.getState
  );
}



(async () => render(await checkLoggedIn()))()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
