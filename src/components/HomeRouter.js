import React from 'react'

import {
  Route,
  Switch
} from 'react-router-dom'

import NewOrder from '../containers/NewOrder'
import Main from '../containers/Main'

const HomeRouter = () => {
  return (
    <Switch>
      <Route path="/home/new-order" component={NewOrder} />
      <Route path="/home" component={Main} />
    </Switch>
  )
}

export default HomeRouter
