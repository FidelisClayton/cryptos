import React, { Component } from 'react'

import {
  auth,
  addUser
} from '../firebase'

import InputGroup from './InputGroup'

export default class Register extends Component {
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

    auth.createUserWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          email: null,
          password: null,
          error: null
        })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  render () {
    return (
      <div className="login">
        <div className="auth__wrapper">
          <h2 className="heading u-text-center">Welcome back to Cryptus!</h2>
          <h3 className="heading-description u-text-center">Register to have access to the best Crypto portfolio tracker</h3>

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
                Register
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
