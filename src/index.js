require('./styles/application.scss');

import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl'

import {
  HashRouter as Router
} from 'react-router-dom'

import App from './App';

ReactDOM.render((
  <IntlProvider locale="en">
    <Router>
      <App />
    </Router>
  </IntlProvider>
), document.getElementById('react-root'));
