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
import NewOrder from './components/NewOrder'
import MatchWhenAuthorized from './components/MatchWhenAuthorized'

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
      </div>
    )
  }
}


export default App
