import React, { Component } from 'react'

import { transactionsRef } from '../firebase'

export default class Transactions extends Component {
  constructor () {
    super()

    this.state = {
      transactions: {}
    }
  }

  componentDidMount () {
    transactionsRef.on('value', snapshot => {
      this.setState({ transactions: snapshot.val() })
    })
  }

  renderTransactions (transactions) {
    return Object.entries(transactions).map(([ key, transaction ]) => (
      <tr key={key}>
        <td>{ transaction.coin.name } ({ transaction.coin.symbol})</td>
        <td>{ transaction.priceUSD }</td>
        <td>{ transaction.priceBTC }</td>
        <td>{ transaction.priceETH }</td>
        <td>{ transaction.date }</td>
      </tr>
    ))
  }

  render () {
    return (
      <div className="transactions">
        <table className="transactions__table">
          <thead>
            <tr>
              <th>
                Coin
              </th>
              <th>
                Price (USD)
              </th>
              <th>
                Price (BTC)
              </th>
              <th>
                Price (ETH)
              </th>
              <th>
                Date
              </th>
            </tr>
          </thead>

          <tbody>
            { this.renderTransactions(this.state.transactions) }
          </tbody>
        </table>
      </div>
    )
  }
}
