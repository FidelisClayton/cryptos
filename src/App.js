import React, { Component } from 'react'

import Header from './components/Header'
import AccountSummary from './components/AccountSummary'
import ContentMenu from './components/ContentMenu'
import Portfolio from './components/Portfolio'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <AccountSummary />
        <ContentMenu />
        <Portfolio />
      </div>
    )
  }
}
export default App
