import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import {
  auth,
  addUser,
  googleAuth,
  facebookAuth,
  twitterAuth,
  githubAuth,
  userRef
} from '../firebase'

import InputGroup from './InputGroup'
import Button from './Button'

export default class Register extends Component {
  constructor () {
    super()

    this.state = {
      email: null,
      password: null,
      error: null,
      redirectToHome: false
    }
  }

  onInputChange = inputName =>
    event => this.setState({
      [inputName]: event.target.value
    })

  handleGoogleLogin = () => {
    auth.signInWithPopup(googleAuth)
      .then(res => userRef(res.user.uid).set(res.additionalUserInfo.profile))
      .then(() => {
        this.setState({
          redirectToHome: true
        })
      })
      .catch(this.handleAuthProviderLoginError)
  }

  handleFacebookLogin = () => {
    auth.signInWithPopup(facebookAuth)
      .then(res => userRef(res.user.uid).set(res.additionalUserInfo.profile))
      .then(() => {
        this.setState({
          redirectToHome: true
        })
      })
      .catch(this.handleAuthProviderLoginError)
  }

  handleTwitterLogin = () => {
    auth.signInWithPopup(twitterAuth)
      .then(res => userRef(res.user.uid).set(res.additionalUserInfo.profile))
      .then(() => {
        this.setState({
          redirectToHome: true
        })
      })
      .catch(this.handleAuthProviderLoginError)
  }

  handleGithubLogin = () => {
    auth.signInWithPopup(githubAuth)
      .then(res => userRef(res.user.uid).set(res.additionalUserInfo.profile))
      .then(() => {
        this.setState({
          redirectToHome: true
        })
      })
      .catch(this.handleAuthProviderLoginError)
  }

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
          error: null,
          redirectToHome: true
        })
      })
      .catch(error => {
        this.setState({
          error: error.message
        })
      })
  }

  render () {
    const { from } = this.props.location.state || '/'

    return (
      <div className="login">
        { this.state.redirectToHome && (
            <Redirect to={from || '/home'} />
          )
        }

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

            <div className="auth__providers">
              <Button
                image="dist/assets/images/github.svg"
                onClick={this.handleGithubLogin}
              />

              <Button
                onClick={this.handleGoogleLogin}
                image="dist/assets/images/google.svg"
              />

              <Button
                onClick={this.handleFacebookLogin}
                image="dist/assets/images/facebook.svg"
              />

              <Button
                onClick={this.handleTwitterLogin}
                image="dist/assets/images/twitter.svg"
              />
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
