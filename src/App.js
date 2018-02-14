import React, { Component } from 'react'

import {
  Route,
  Switch,
} from 'react-router-dom'

import {
  auth,
  STORAGE_KEY
} from './firebase'

import Authentication from './Authentication'
import Home from './components/Home'
import MatchWhenAuthorized from './components/MatchWhenAuthorized'
import Footer from './components/Footer'

class App extends Component {
  constructor () {
    super()

    this.state = {
      uid: null
    }
  }

  componentDidMount () {
    auth.onAuthStateChanged(user => {
      if (user) {
        window.localStorage.setItem(STORAGE_KEY, user.uid)
        this.setState({ uid: user.uid })
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
        this.setState({ uid: null })
      }
    })
  }

  render() {
    return (
      <div>
        <Switch>
          <MatchWhenAuthorized path="/home" component={Home} />
          <Route path="/" component={Authentication} />
        </Switch>
        <Footer />
      </div>
    )
  }
}


export default App
