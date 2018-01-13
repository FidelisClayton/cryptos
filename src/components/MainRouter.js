import React from 'react'

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import Home from './Home'
import Header from './Header'
import NewOrder from './NewOrder'

const MainRouter = () => {
  return (
    <Router>
      <div>
        <Header />
        <Route path="/" component={Home}>
          <Route path="/order" component={NewOrder} />
        </Route>
      </div>
    </Router>
  )
}

export default MainRouter
