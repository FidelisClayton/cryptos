require('./styles/login.scss')

import React from 'react'
import ReactDOM from 'react-dom'

import {
  HashRouter as Router
} from 'react-router-dom'

import Auth from './Authentication'

ReactDOM.render((
  <Router>
    <Auth />
  </Router>
), document.getElementById('react-root'))
