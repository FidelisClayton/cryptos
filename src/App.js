import React, { Component } from 'react'

import {
  Route,
  Switch
} from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home'
import NewOrder from './components/NewOrder'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path="/new-order" component={NewOrder} />
          <Route path="/" component={Home} />
        </Switch>
      </div>
    )
  }
}
export default App
