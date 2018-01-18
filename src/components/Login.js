import React, { Component } from 'react'

import { auth } from '../firebase'

import InputGroup from './InputGroup'

const USER_NOT_FOUND = 'auth/user-not-found'

export default class Login extends Component {
  constructor () {
    super()

    this.state = {
      email: null,
      password: null,
      error: null
    }
  }

  onInputChange = inputName =>
    event => this.setState({
      [inputName]: event.target.value
    })

  handleFormSubmit = event => {
    const {
      email,
      password
    } = this.state

    event.preventDefault()

    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          email: null,
          password: null,
          error: null
        })
      })
      .catch(error => {
        let errorMessage = ''

        switch (error.code) {
          case USER_NOT_FOUND:
            errorMessage = 'Email and password doesn\'t match'
            break

          default:
            errorMessage = error.message
        }

        this.setState({
          error: errorMessage
        })
      })
  }

  render () {
    return (
      <div className="login">
        <div className="auth__wrapper">
          <h2 className="heading u-text-center">Welcome back to Cryptus!</h2>
          <h3 className="heading-description u-text-center">Login with your email and password to proceed to the application</h3>

          <form
            className="auth__login-form"
            onSubmit={this.handleFormSubmit}
          >
            <InputGroup
              inputSize="small"
              inputProps={{
                placeholder: 'Email address',
                type: 'email'
              }}
              onChange={this.onInputChange('email')}
            />

            <InputGroup
              type="password"
              inputSize="small"
              inputProps={{
                placeholder: 'Password',
                type: 'password'
              }}
              onChange={this.onInputChange('password')}
            />

            <div className="auth__submit">
              <button
                type="submit"
                className="button__primary button--small"
              >
                Login
              </button>
            </div>

            { this.state.error && (
                <div className="auth__error">
                  { this.state.error }
                </div>
              )
            }
          </form>
        </div>
      </div>
    )
  }
}
