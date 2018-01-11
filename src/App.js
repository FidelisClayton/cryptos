import React, { Component } from 'react'

import Header from './components/Header'
import AccountSummary from './components/AccountSummary'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <AccountSummary />
      </div>
    )
  }
}
export default App
