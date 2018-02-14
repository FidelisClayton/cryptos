import React, { PureComponent } from 'react'

import Button from './Button'

import firebase, {
  auth,
  googleAuth,
  facebookAuth,
  twitterAuth,
  githubAuth,
  userRef
} from '../firebase'

export default class AuthProviders extends PureComponent {
  setUser = authData => {
    return userRef(authData.user.uid).set(authData.additionalUserInfo.profile)
  }

  handleGoogleLogin = () => {
    auth.signInWithPopup(googleAuth)
      .then(this.setUser)
      .then(this.props.handleAuthSuccess)
      .catch(this.props.handleAuthProviderLoginError)
  }

  handleFacebookLogin = () => {
    auth.signInWithPopup(facebookAuth)
      .then(this.setUser)
      .then(this.props.handleAuthSuccess)
      .catch(this.props.handleAuthProviderLoginError)
  }

  handleTwitterLogin = () => {
    auth.signInWithPopup(twitterAuth)
      .then(this.setUser)
      .then(this.props.handleAuthSuccess)
      .catch(this.props.handleAuthProviderLoginError)
  }

  handleGithubLogin = () => {
    auth.signInWithPopup(githubAuth)
      .then(this.setUser)
      .then(this.props.handleAuthSuccess)
      .catch(this.props.handleAuthProviderLoginError)
  }

  render () {
    return (
      <div className="auth__providers">
        <Button
          image="assets/images/github.svg"
          onClick={this.handleGithubLogin}
        />

        <Button
          onClick={this.handleGoogleLogin}
          image="assets/images/google.svg"
        />

        <Button
          onClick={this.handleFacebookLogin}
          image="assets/images/facebook.svg"
        />

        <Button
          onClick={this.handleTwitterLogin}
          image="assets/images/twitter.svg"
        />
      </div>
    )
  }
}
