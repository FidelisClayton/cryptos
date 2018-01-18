import React, { Component } from 'react'

import {
  Redirect,
  Route
} from 'react-router-dom'

import { isAuthenticated } from '../firebase'

const MatchWhenAuthorized = ({
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={renderProps => (
      isAuthenticated()
      ? (
        <Component {...renderProps} {...rest} />
      )
      : (
        <Redirect to={{
          pathname: '/',
          state: { from: renderProps.location }
        }}
      />
    )
  )}
  />
)

export default MatchWhenAuthorized
