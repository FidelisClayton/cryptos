import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import firebase, {
  auth,
  isAuthenticated,
  googleAuth,
  facebookAuth,
  twitterAuth,
  githubAuth,
  userRef
} from '../firebase'

import InputGroup from './InputGroup'

const USER_NOT_FOUND = 'auth/user-not-found'

export default class Login extends Component {
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

  handleAuthProviderLoginError = (error) => {
    this.setState({
      error: error.message
    })

    return error
  }

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

    auth.signInWithEmailAndPassword(email, password)
      .then(response => {
        this.setState({
          redirectToHome: true
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
    const { from } = this.props.location.state || '/'
    const { redirectToHome } = this.state

    return (
      <div className="login">
        { redirectToHome && (
            <Redirect to={from || '/home'} />
          )
        }

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

            <div className="auth__submit">
              <button
                type="button"
                className="button__primary button--small"
                onClick={this.handleGoogleLogin}
              >
                Login with Google
              </button>
            </div>

            <div className="auth__submit">
              <button
                type="button"
                className="button__primary button--small"
                onClick={this.handleFacebookLogin}
              >
                Login with Facebook
              </button>
            </div>

            <div className="auth__submit">
              <button
                type="button"
                className="button__primary button--small"
                onClick={this.handleTwitterLogin}
              >
                Login with Twitter
              </button>
            </div>

            <div className="auth__submit">
              <button
                type="button"
                className="button__primary button--small"
                onClick={this.handleGithubLogin}
              >
                Login with Github
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
