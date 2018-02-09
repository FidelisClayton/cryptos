require('./styles/application.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl'

import {
  HashRouter as Router
} from 'react-router-dom'

import App from './App';
import store from './store'

ReactDOM.render((
  <Provider store={store}>
    <IntlProvider locale="en">
      <Router>
        <App />
      </Router>
    </IntlProvider>
  </Provider>
), document.getElementById('react-root'));
