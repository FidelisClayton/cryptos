import React from 'react'

import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom'

import ContentMenu from './ContentMenu'
import History from './History'
import Portfolio from './Portfolio'

const InnerRouter = () => {
  return (
    <Router>
      <div>
        <ContentMenu />

        <div className="inner-content">
          <h2 className="inner-content__title">Your portfolio during <br /> the time</h2>
          <div className="inner-content__chart-wrapper">
            <Switch>
              <Route exact path="/" component={History}/>
              <Route path="/history" component={History}/>
              <Route path="/portfolio" component={Portfolio}/>
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default InnerRouter
