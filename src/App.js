import React, { Component } from 'react'

import Header from './components/Header'
import AccountSummary from './components/AccountSummary'
import ContentMenu from './components/ContentMenu'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <AccountSummary />
        <ContentMenu />
      </div>
    )
  }
}
export default App
