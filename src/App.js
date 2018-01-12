import React, { Component } from 'react'

import Header from './components/Header'
import AccountSummary from './components/AccountSummary'
import InnerRouter from './components/InnerRouter'

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <AccountSummary />
        <InnerRouter />
      </div>
    )
  }
}
export default App
