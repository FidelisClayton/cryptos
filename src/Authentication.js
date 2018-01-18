import React, { Component } from 'react'

import {
  HashRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom'

import Login from './components/Login'
import Register from './components/Register'

export default class Auth extends Component {
  constructor () {
    super()

    this.state = {
      email: null,
      password: null
    }
  }

  render () {
    const hash = window.location.hash

    return (
      <div className="auth">
        <div className="auth__wrapper">
          <Router>
            <Switch>
              <Route
                exact
                path="/"
                component={Login}
              />

              <Route
                path="/register"
                component={Register}
              />
            </Switch>
          </Router>

          { hash === '#/register'
              ? (
                <div className="auth__footer">
                  Already have an account? <Link to="/">Login</Link>.
                </div>
              )
              : (
                <div className="auth__footer">
                  Don't have an account? <Link to="/register">Register</Link>.
                </div>
              )
          }
        </div>
      </div>
    )
  }
}
