import React from 'react'

import { Route } from 'react-router-dom'

import ContentMenu from './ContentMenu'
import History from './History'
import Portfolio from './Portfolio'
import Transactions from './Transactions'

const InnerRouter = () => {
  return (
    <div>
      <ContentMenu />

      <div className="inner-content">
        <h2 className="inner-content__title">Your portfolio during <br /> the time</h2>
        <div className="inner-content__wrapper">
          <Route exact path="/" component={History}/>
          <Route exact path="/history" component={History}/>
          <Route exact path="/portfolio" component={Portfolio}/>
          <Route exact path="/transactions" component={Transactions}/>
        </div>
      </div>
    </div>
  )
}

export default InnerRouter
